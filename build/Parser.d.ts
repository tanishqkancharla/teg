import { ParseFailure, ParseResult, ParseSuccess } from "./ParseResult";
import { ParserStream } from "./ParserStream";
export declare class Parser<K> {
    private parseFn;
    constructor(parseFn: (stream: ParserStream) => ParseResult<K>);
    run(stream: ParserStream | string): ParseResult<K>;
    map<T>(fn: (tokens: K) => T): Parser<T>;
    bimap<T>(successFn: (arg: K) => T, failFn: (arg: string) => string): Parser<T>;
    /** Combine parsers together in sequence */
    chain<T>(fn: (val: K) => Parser<T>): Parser<any>;
    fold<S>(successFn: (res: ParseSuccess<K>) => ParseResult<S>, failFn: (res: ParseFailure) => ParseResult<S>): Parser<S>;
}
