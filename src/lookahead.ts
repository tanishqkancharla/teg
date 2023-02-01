import { Parser } from "./Parser"
import { ParseSuccess } from "./ParseResult"

/**
 * Look ahead in the stream to match the given parser.
 * If it succeeds, it consumes no tokens.
 */
export const lookahead = <T>(parser: Parser<T>): Parser<T> =>
	new Parser((stream) => {
		const result = parser.run(stream)

		if (result.isFailure()) {
			return result.extend("Lookahead failed.")
		} else {
			return new ParseSuccess(result.value, stream)
		}
	}, "lookahead")
