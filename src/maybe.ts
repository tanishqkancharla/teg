import { Parser } from "./Parser"
import { ParseSuccess } from "./ParseResult"
import { isParseFailure } from "./parseUtils"

/**
 * Tries matching a parser, returns undefined if it fails
 * NOTE: This parser always succeeds
 */
export const maybe = <T>(parser: Parser<T>): Parser<T | undefined> =>
	new Parser((stream) => {
		const result = parser.run(stream)

		if (isParseFailure(result)) {
			return new ParseSuccess(undefined, stream)
		} else {
			return new ParseSuccess(result.value, result.stream)
		}
	}, "maybe")
