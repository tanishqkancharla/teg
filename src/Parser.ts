import { ParseFailure, ParseResult, ParseSuccess } from "./ParseResult"
import { ParserStream } from "./ParserStream"
import { isParseFailure } from "./parseUtils"

export class Parser<K> {
	constructor(
		private parseFn: (stream: ParserStream) => ParseResult<K>,
		public errorScope = "Unknown Parser"
	) {}

	run(stream: ParserStream | string) {
		const parserStream =
			stream instanceof ParserStream ? stream : new ParserStream(stream)
		const startingIndex = parserStream.index

		try {
			const result = this.parseFn(parserStream)

			if (isParseFailure(result)) {
				return result.extend(
					`In middle of parsing ${this.errorScope} at ${startingIndex}`
				)
			} else {
				return result
			}
		} catch (e) {
			return new ParseFailure(
				`${e}\nUnexpected parse failure in middle of parsing ${this.errorScope}`,
				parserStream
			)
		}
	}

	withErrorScope = (scope: string) => {
		this.errorScope = scope
		return this
	}

	map<T>(fn: (tokens: K) => T) {
		return new Parser((stream) => this.parseFn(stream).map(fn))
	}

	bimap<T>(successFn: (arg: K) => T, failFn: (arg: string) => string) {
		return new Parser((stream) => this.parseFn(stream).bimap(successFn, failFn))
	}

	/** Combine parsers together in sequence */
	chain<T>(fn: (val: K) => Parser<T>): Parser<T> {
		return new Parser((stream) =>
			this.parseFn(stream).chain((val, stream) => fn(val).run(stream))
		)
	}

	fold<S>(
		successFn: (res: ParseSuccess<K>) => ParseResult<S>,
		failFn: (res: ParseFailure) => ParseResult<S>
	) {
		return new Parser((stream) => this.parseFn(stream).fold(successFn, failFn))
	}
}
