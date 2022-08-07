import { Parser } from "./Parser";
import { ParseFailure, ParseResult, ParseSuccess } from "./ParseResult";
import { ParserStream } from "./ParserStream";

export function isParseSuccess<T>(
	result: ParseResult<T>
): result is ParseSuccess<T> {
	return result instanceof ParseSuccess;
}

export function isParseFailure(
	result: ParseResult<any>
): result is ParseFailure {
	return result instanceof ParseFailure;
}

export function logStream(stream: ParserStream) {
	const { content, marker } = stream.log();
	return `|
| ${content}
| ${marker}`;
}

export function logResult(result: ParseResult<any>) {
	if (isParseFailure(result)) {
		return `
Parse Failure

${logStream(result.stream)}

Failed at index ${result.stream.index}: ${result.value}
`;
	} else {
		return `
Parse Success
"${result.stream.content}" ==> ${JSON.stringify(result.value, undefined, "  ")}
`;
	}
}

export const concat = (strs: string[]) => strs.join("");

// Helper types
// Hover over the declare const to get a sense of what they do

export type ParserToken<T> = T extends Parser<infer U> ? U : never;

declare const aParser: Parser<"a">;
declare const tokenX: ParserToken<typeof aParser>;

export type ParserTokenArray<Tuple extends readonly Parser<any>[]> = {
	[Index in keyof Tuple]: ParserToken<Tuple[Index]>;
};

declare const parsers: [Parser<"a">, Parser<"b">, Parser<"c">];
declare const tokenArray: ParserTokenArray<typeof parsers>;

type ParserArrayType<ParserArray extends readonly Parser<any>[]> =
	ParserTokenArray<ParserArray>[number];

declare const type: ParserArrayType<typeof parsers>;

export type FixedSizeArray<N extends number, T> = N extends 0
	? never[]
	: {
			0: T;
			length: N;
	  } & ReadonlyArray<T>;
