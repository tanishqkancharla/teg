import { Parser } from "./Parser";
import { ParseFailure, ParseSuccess } from "./ParseResult";
import { isParseSuccess } from "./parseUtils";

export const nOrMore = <T, D = never>(
	n: number,
	parser: Parser<T>,
	delimiter?: Parser<D>
): Parser<T[]> =>
	new Parser((stream) => {
		const values: T[] = [];
		let errVal: string;

		while (true || stream.isEmpty) {
			let result = parser.run(stream);

			if (isParseSuccess(result)) {
				const { value, stream: newStream } = result;
				values.push(value);
				stream = newStream;

				if (delimiter) {
					const afterDelimResult = delimiter.run(newStream);

					if (afterDelimResult instanceof ParseSuccess) {
						stream = afterDelimResult.stream;
					} else {
						errVal = `Could not parse delimiter after ${values.length} values:
${afterDelimResult.value}`;
						break;
					}
				}
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

export const zeroOrMore = <T, D>(parser: Parser<T>, delimiter?: Parser<D>) =>
	nOrMore(0, parser, delimiter);

export const oneOrMore = <T, D>(parser: Parser<T>, delimiter?: Parser<D>) =>
	nOrMore(1, parser, delimiter);
