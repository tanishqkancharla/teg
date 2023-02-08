import { Parser } from "./Parser"

export const concat = (strs: string[]) => strs.join("")

export function takeFirst<T>(values: [T, ...any[]]): T {
	return values[0]
}

export function takeLast<T>(values: [...any[], T]): T {
	return values[values.length - 1]
}

// Helper types
// Hover over the declare const to get a sense of what they do

export type ParserToken<T> = T extends Parser<infer U> ? U : never

declare const aParser: Parser<"a">
declare const tokenX: ParserToken<typeof aParser>

export type ParserTokenArray<Tuple extends readonly Parser<any>[]> = {
	[Index in keyof Tuple]: ParserToken<Tuple[Index]>
}

declare const parsers: [Parser<"a">, Parser<"b">, Parser<"c">]
declare const tokenArray: ParserTokenArray<typeof parsers>

type ParserArrayType<ParserArray extends readonly Parser<any>[]> =
	ParserTokenArray<ParserArray>[number]

declare const type: ParserArrayType<typeof parsers>

export type FixedSizeArray<N extends number, T> = N extends 0
	? []
	: {
			0: T
			length: N
	  } & ReadonlyArray<T>

// How many spaces to count in a tab (project-level config)
const tabToSpaces = 2
const spaceForTab = " ".repeat(tabToSpaces)

function convertTabsToSpaces(line: string) {
	return line.replace(/\t/g, spaceForTab)
}

function getIndentCount(line: string) {
	// Ignore empty lines
	if (line === "") return Number.POSITIVE_INFINITY
	let indent = 0

	for (const char of line) {
		if (char === " ") {
			indent += 1
		} else {
			return indent
		}
	}

	return indent
}

/**
 * Achieves the same thing as https://www.npmjs.com/package/outdent, but a little cleaner
 */
export function outdent(contents: string) {
	let lines = convertTabsToSpaces(contents).split("\n")

	// Ignore all-whitespace lines at the beginning and end
	// (which are common in template literals)
	if (lines[0].trim() === "") {
		lines = lines.slice(1)
	}
	if (lines[lines.length - 1].trim() === "") {
		lines = lines.slice(0, lines.length - 1)
	}

	const indentCounts = lines.map(getIndentCount)
	const minIndentCount = Math.min(...indentCounts)

	const trimmedLines = lines.map((line) => line.slice(minIndentCount))

	return trimmedLines.join("\n")
}
