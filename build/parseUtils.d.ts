import { Parser } from "./Parser";
import { ParseFailure, ParseResult, ParseSuccess } from "./ParseResult";
import { ParserStream } from "./ParserStream";
export declare const identity: <T>(arg: T) => T;
export declare function isParseSuccess<T>(
	result: ParseResult<T>
): result is ParseSuccess<T>;
export declare function isParseFailure(
	result: ParseResult<any>
): result is ParseFailure;
export declare function logStream(stream: ParserStream): string;
export declare function logResult(result: ParseResult<any>): string;
export declare type ParserToken<T> = T extends Parser<infer U> ? U : never;
declare type ParserTokenArray<Tuple extends readonly Parser<any>[]> = {
	[Index in keyof Tuple]: ParserToken<Tuple[Index]>;
};
declare type FixedSizeArray<N extends number, T> = N extends 0
	? never[]
	: {
			0: T;
			length: N;
	  } & ReadonlyArray<T>;
export declare const str: <Char extends string>(c: Char) => Parser<Char>;
export declare const notChars: (chars: string[]) => Parser<string>;
export declare const nOrMore: <T>(n: number, parser: Parser<T>) => Parser<T[]>;
export declare const zeroOrMore: <T>(parser: Parser<T>) => Parser<T[]>;
export declare const oneOrMore: <T>(parser: Parser<T>) => Parser<T[]>;
export declare const oneOf: <ParserArray extends readonly Parser<any>[]>(
	parsers: ParserArray
) => Parser<ParserToken<ParserArray[number]>>;
export declare function sequence<
	N extends number,
	ParserArray extends FixedSizeArray<N, Parser<any>>,
	Delimiter
>(
	parsers: ParserArray,
	delimiter?: Parser<Delimiter>
): Parser<ParserTokenArray<ParserArray>>;
export declare function sequence<
	N extends number,
	ParserArray extends Parser<any>[],
	Delimiter
>(
	parsers: ParserArray,
	delimiter?: Parser<Delimiter>
): Parser<ParserTokenArray<ParserArray>>;
export declare const lookahead: <T>(parser: Parser<T>) => Parser<T>;
export declare const maybe: <T>(parser: Parser<T>) => Parser<T | undefined>;
export declare const str: (str: string) => Parser<string>;
export declare const concat: (strs: string[]) => string;
export declare const between: <L, T, R>(
	left: Parser<L>,
	parser: Parser<T>,
	right: Parser<R>
) => Parser<T>;
export declare const prefix: <P, T>(
	prefix: Parser<P>,
	parser: Parser<T>
) => Parser<T>;
export declare const suffix: <T, S>(
	parser: Parser<T>,
	suffix: Parser<S>
) => Parser<T>;
export declare const not: <T>(parser: Parser<T>) => Parser<string>;
export declare const takeUntilAfter: <T>(parser: Parser<T>) => Parser<string>;
export declare const line: Parser<string>;
export {};
