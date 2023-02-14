import { Parser } from "./Parser"
import { ParseFailure, ParseSuccess } from "./ParseResult"

/** Matches a specific string value */
export function text<T extends string>(value: T): Parser<T> {
	return new Parser((stream) => {
		const chars = value.split("")

		for (const char of chars) {
			const head = stream.head(1)
			if (head !== char) {
				return new ParseFailure(
					`Expected char "${char}", found "${head}"`,
					stream
				)
			}

			stream = stream.move(1)
		}

		return new ParseSuccess(value, stream)
	}).withErrorScope(`text("${value}")`)
}
