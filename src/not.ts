import { Parser } from "./Parser"
import { ParseFailure, ParseSuccess } from "./ParseResult"

/**
 * Matches if the given parser fails.
 * Consumes a single character if it matches.
 */
export const not = (parser: Parser<any>): Parser<string> =>
	new Parser((stream) => {
		if (stream.isEmpty()) {
			return new ParseFailure("Stream was emptied", stream)
		}
		const result = parser.run(stream)

		if (result.isFailure()) {
			return new ParseSuccess(stream.head(), stream.move(1))
		} else {
			return new ParseFailure(
				`Parser succeeded when it was supposed to fail`,
				result.stream
			)
		}
	}, "not")
