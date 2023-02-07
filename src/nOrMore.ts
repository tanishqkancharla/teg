import { Parser } from "./Parser"
import { ParseFailure, ParseSuccess } from "./ParseResult"

/**
 * Match the given parser n or more times, with an optional delimiter parser
 * in between.
 */
export const nOrMore = <T, D = never>(
	n: number,
	parser: Parser<T>,
	delimiter?: Parser<D>
): Parser<T[]> =>
	new Parser((stream) => {
		const values: T[] = []
		let errVal: string = "Stream was empty"
		let beforeLastDelimStream = stream

		while (!stream.isEmpty()) {
			let result = parser.run(stream)

			if (result.isSuccess()) {
				const { value, stream: newStream } = result
				values.push(value)
				stream = newStream
				beforeLastDelimStream = stream

				if (delimiter) {
					const afterDelimResult = delimiter.run(newStream)

					if (afterDelimResult instanceof ParseSuccess) {
						stream = afterDelimResult.stream
					} else {
						errVal = `${afterDelimResult.value}\nCould not parse delimiter after ${values.length} values:`
						break
					}
				}
			} else {
				errVal = result.value
				break
			}
		}

		if (values.length < n) {
			return new ParseFailure(
				`${errVal}\nnOrMore failed: only matched ${values.length} tokens`,
				stream
			)
		}

		return new ParseSuccess(values, beforeLastDelimStream)
	}, `norMore (n=${n})`)

/**
 * Match the given parser zero or more times, with an optional delimiter
 * NOTE: this will always succeed.
 */
export const zeroOrMore = <T, D>(parser: Parser<T>, delimiter?: Parser<D>) =>
	nOrMore(0, parser, delimiter)

/**
 * Match the given parser one or more times, with an optional delimiter
 */
export const oneOrMore = <T, D>(parser: Parser<T>, delimiter?: Parser<D>) =>
	nOrMore(1, parser, delimiter)
