import { literal } from "./literal"
import { Parser } from "./Parser"
import type { ParserTokenArray } from "./parseUtils"
import { sequence } from "./sequence"

function enumerate<T>(array: ReadonlyArray<T>): [number, T][] {
	return array.map((value, i) => [i, value])
}

export function template<ParserArray extends ReadonlyArray<Parser<any>>>(
	strings: TemplateStringsArray,
	...embeddedParsers: ParserArray
): Parser<ParserTokenArray<ParserArray>> {
	const parsers: Parser<any>[] = []
	const lastStrParser = literal(strings[strings.length - 1])

	for (const [index, parser] of enumerate(embeddedParsers)) {
		parsers.push(literal(strings[index]))
		parsers.push(parser)
	}

	parsers.push(lastStrParser)

	return (
		sequence(parsers as any)
			// Only select the non-string values
			.map((values) => values.filter((_, index) => index % 2 === 1))
			.withErrorScope("template") as any
	)
}
