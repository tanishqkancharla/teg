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
