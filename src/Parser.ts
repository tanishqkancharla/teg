import { ParseFailure, ParseResult, ParseSuccess } from "./ParseResult";
import { ParserStream } from "./ParserStream";

export class Parser<K> {
	constructor(private parseFn: (stream: ParserStream) => ParseResult<K>) {}

	run(stream: ParserStream | string) {
		const parserStream =
			stream instanceof ParserStream ? stream : new ParserStream(stream);
		try {
			return this.parseFn(parserStream);
		} catch (e) {
			return new ParseFailure(`Unexpected parse failure: ${e}`, parserStream);
		}
	}

	map<T>(fn: (tokens: K) => T) {
		return new Parser((stream) => this.parseFn(stream).map(fn));
	}

	bimap<T>(successFn: (arg: K) => T, failFn: (arg: string) => string) {
		return new Parser((stream) =>
			this.parseFn(stream).bimap(successFn, failFn)
		);
	}

	/** Combine parsers together in sequence */
	chain<T>(fn: (val: K) => Parser<T>) {
		return new Parser((stream) =>
			this.parseFn(stream).chain((val, stream) => fn(val).run(stream))
		);
	}

	fold<S>(
		successFn: (res: ParseSuccess<K>) => ParseResult<S>,
		failFn: (res: ParseFailure) => ParseResult<S>
	) {
		return new Parser((stream) => this.parseFn(stream).fold(successFn, failFn));
	}
}
