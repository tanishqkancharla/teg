import { Parser } from "./Parser";
import { ParseSuccess } from "./ParseResult";
import { FixedSizeArray, ParserTokenArray } from "./parseUtils";

// This overload is what lets sequence type the parser when passed in
// a constant array like `[char("a"),char("b"),char("c")]`
export function sequence<
	N extends number,
	ParserArray extends FixedSizeArray<N, Parser<any>>,
	Delimiter
>(
	parsers: ParserArray,
	delimiter?: Parser<Delimiter>
): Parser<ParserTokenArray<ParserArray>>;

export function sequence<
	N extends number,
	ParserArray extends Parser<any>[],
	Delimiter
>(
	parsers: ParserArray,
	delimiter?: Parser<Delimiter>
): Parser<ParserTokenArray<ParserArray>>;

/**
 * Match the given parsers in sequence (or fail)
 *
 * @example
 * sequence([char("a"), char("b"), char("c")]) // Matches "abc"
 */
export function sequence<
	N extends number,
	ParserArray extends FixedSizeArray<N, Parser<any>>,
	Delimiter
>(
	parsers: ParserArray,
	delimiter?: Parser<Delimiter>
): Parser<ParserTokenArray<ParserArray>> {
	return new Parser((stream) => {
		// type SeqParserTokenArray = ParserTokenArray<ParserArray>;
		// type SeqParserToken = SeqParserTokenArray[keyof SeqParserTokenArray];
		const seqValues = [] as any;

		for (const parser of parsers) {
			const result = parser.run(stream);

			if (result instanceof ParseSuccess) {
				const { value, stream: newStream } = result;
				seqValues.push(value);
				stream = newStream;

				const notAtEnd = seqValues.length < parsers.length;

				if (delimiter && notAtEnd) {
					const { stream: afterDelimStream } = delimiter.run(newStream);

					if (result instanceof ParseSuccess) {
						stream = afterDelimStream;
					} else {
						return result;
					}
				}
			} else {
				return result;
			}
		}

		return new ParseSuccess(seqValues, stream);
	}, "sequence");
}
