import { Parser } from "./Parser";
import { ParseFailure, ParseSuccess } from "./ParseResult";

/** Matches a string */
export const str = <T extends string>(stringToMatch: T): Parser<T> =>
	new Parser((stream) => {
		const nextStrOfLength = stream.head(stringToMatch.length);

		if (nextStrOfLength === stringToMatch) {
			return new ParseSuccess(stringToMatch, stream.move(stringToMatch.length));
		} else {
			return new ParseFailure(
				`String did not match ${stringToMatch}, found ${nextStrOfLength}`,
				stream
			);
		}
	}).withErrorScope(`String ${stringToMatch}`);
