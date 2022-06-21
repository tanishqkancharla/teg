import { Parser } from "./Parser";
import { ParseFailure, ParseSuccess } from "./ParseResult";
import { isParseSuccess } from "./parseUtils";

export const nOrMore = <T>(n: number, parser: Parser<T>): Parser<T[]> =>
	new Parser((stream) => {
		const values: T[] = [];
		let errVal: string;

		while (true || stream.isEmpty) {
			let result = parser.run(stream);

			if (isParseSuccess(result)) {
				values.push(result.value);
				stream = result.stream;
			} else {
				errVal = result.value;
				break;
			}
		}

		if (values.length < n) {
			return new ParseFailure(
				`nOrMore failed: only matched ${values.length} tokens
${errVal}`,
				stream
			);
		}

		return new ParseSuccess(values, stream);
	});

export const zeroOrMore = <T>(parser: Parser<T>) => nOrMore(0, parser);
export const oneOrMore = <T>(parser: Parser<T>) => nOrMore(1, parser);
