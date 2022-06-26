import { Parser } from "./Parser";
import { ParseFailure, ParseSuccess } from "./ParseResult";

/** Matches exactly one of the given parsers */
export const oneOf = <ParserArray extends Parser<any>[]>(
	parsers: ParserArray
): ParserArray[number] =>
	new Parser((stream) => {
		for (const parser of parsers) {
			const result = parser.run(stream);

			if (result instanceof ParseSuccess) {
				return result;
			}
		}

		return new ParseFailure(
			"oneOf failed: Didn't match any of the given parsers",
			stream
		);
	});
