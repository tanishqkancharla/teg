import { Parser } from "./Parser";
import { ParseSuccess } from "./ParseResult";
import { isParseFailure } from "./parseUtils";

export const lookahead = <T>(parser: Parser<T>): Parser<T> =>
	new Parser((stream) => {
		const result = parser.run(stream);

		if (isParseFailure(result)) {
			return result.extend("Lookahead failed.");
		} else {
			return new ParseSuccess(result.value, stream);
		}
	}, "lookahead");
