import { Parser } from "./Parser";
import { ParseFailure, ParseSuccess } from "./ParseResult";
import { isParseFailure } from "./parseUtils";

/**
 * Look ahead in the stream to match the given parser.
 * If it succeeds, it consumes no tokens.
 */
export const lookahead = <T>(parser: Parser<T>): Parser<T> =>
	new Parser((stream) => {
		const result = parser.run(stream);

		if (isParseFailure(result)) {
			return new ParseFailure(result.value, stream);
		} else {
			return new ParseSuccess(result.value, stream);
		}
	}, "lookahead");
