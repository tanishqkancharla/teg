import { Parser } from "./Parser";
import { ParseFailure, ParseSuccess } from "./ParseResult";
import { isParseFailure } from "./parseUtils";

/**
 * Matches if the given parser fails.
 * Consumes a single character.
 */
export const not = <T>(parser: Parser<T>): Parser<string> =>
	new Parser((stream) => {
		if (stream.isEmpty()) {
			return new ParseFailure("Stream was emptied", stream);
		}
		const result = parser.run(stream);

		if (isParseFailure(result)) {
			return new ParseSuccess(stream.head(), stream.move(1));
		} else {
			return new ParseFailure("`Not` failed", result.stream);
		}
	});
