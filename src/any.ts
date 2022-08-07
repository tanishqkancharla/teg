import { Parser } from "./Parser";
import { ParseFailure, ParseSuccess } from "./ParseResult";

/**
 * Consumes 1 token from the stream.
 */
export const any: Parser<string> = new Parser((stream) => {
	const value = stream.head();
	return new ParseSuccess(value, stream.move(1));
});

export const end: Parser<null> = new Parser((stream) => {
	try {
		const value = stream.head();
		return new ParseFailure(
			`Expected end of stream but found ${value}`,
			stream.move(1)
		);
	} catch {
		return new ParseSuccess(null, stream);
	}
});
