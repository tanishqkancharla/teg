import { ParserStream } from "./ParserStream";
export declare type ParseResult<T> = ParseSuccess<T> | ParseFailure;
interface ParseResultI<T> {
    map<S>(fn: (arg: T) => S): ParseResult<S>;
    bimap<S>(successFn: (arg: T) => S, failFn: (error: string) => string): ParseResult<S>;
    chain<S>(fn: (val: T, stream: ParserStream) => ParseResult<S>): ParseResult<S>;
    fold<S>(successFn: (res: ParseSuccess<T>) => S, failFn: (res: ParseFailure) => S): S;
}
export declare class ParseSuccess<T> implements ParseResultI<T> {
    value: T;
    stream: ParserStream;
    constructor(value: T, stream: ParserStream);
    map<S>(fn: (arg: T) => S): ParseSuccess<S>;
    bimap<S>(successFn: (arg: T) => S, failFn: (error: string) => string): ParseSuccess<S>;
    chain<S>(fn: (val: T, stream: ParserStream) => ParseResult<S>): ParseResult<S>;
    fold<S>(successFn: (res: ParseSuccess<T>) => S, failFn: (res: ParseFailure) => S): S;
}
export declare class ParseFailure implements ParseResultI<string> {
    value: string;
    stream: ParserStream;
    constructor(value: string, stream: ParserStream);
    map<S>(fn: (arg: any) => S): this;
    bimap<S>(successFn: (arg: any) => S, failFn: (error: string) => string): ParseFailure;
    chain<S>(fn: (val: any, stream: ParserStream) => ParseResult<S>): ParseResult<any>;
    fold<S>(successFn: (res: ParseSuccess<any>) => S, failFn: (res: ParseFailure) => S): S;
}
export {};
