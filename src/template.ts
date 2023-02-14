import { Parser } from "./Parser"
import type { ParserTokenArray } from "./parseUtils"
import { sequence } from "./sequence"
import { text } from "./text"

function enumerate<T>(array: ReadonlyArray<T>): [number, T][] {
	return array.map((value, i) => [i, value])
}

/**
 * Tagged template text for parsing.
 *
 * "template`# ${line}`" will parse "# Heading" to ["Heading"]
 *
 * Can use multiple parsers together. Keep in mind parsers run greedily,
 * so "template`${word}content`" will fail on "textcontent" b/c the `word` parser
 * will match "textcontent", and then it will try to match the text "content"
 */
export function template<ParserArray extends ReadonlyArray<Parser<any>>>(
	strings: TemplateStringsArray,
	...embeddedParsers: ParserArray
): Parser<ParserTokenArray<ParserArray>> {
	const parsers: Parser<any>[] = []

	for (const [index, parser] of enumerate(embeddedParsers)) {
		parsers.push(text(strings[index]))
		parsers.push(parser)
	}

	parsers.push(text(strings[strings.length - 1]))

	const errorScope = `template(${parsers
		.map((parser) => parser.errorScope)
		.join(", ")})`

	return (
		sequence(parsers as any)
			// Only select the non-string values
			.map((values) => values.filter((_, index) => index % 2 === 1))
			.withErrorScope(errorScope) as any
	)
}
