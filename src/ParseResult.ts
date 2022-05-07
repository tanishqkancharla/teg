import { ParserStream } from "./ParserStream";

export type ParseResult<T> = ParseSuccess<T> | ParseFailure;

interface ParseResultI<T> {
	map<S>(fn: (arg: T) => S): ParseResult<S>;

	bimap<S>(
		successFn: (arg: T) => S,
		failFn: (error: string) => string
	): ParseResult<S>;

	chain<S>(
		fn: (val: T, stream: ParserStream) => ParseResult<S>
	): ParseResult<S>;

	fold<S>(
		successFn: (res: ParseSuccess<T>) => S,
		failFn: (res: ParseFailure) => S
	): S;
}

export class ParseSuccess<T> implements ParseResultI<T> {
	constructor(public value: T, public stream: ParserStream) {}

	map<S>(fn: (arg: T) => S) {
		return new ParseSuccess(fn(this.value), this.stream);
	}

	bimap<S>(successFn: (arg: T) => S, failFn: (error: string) => string) {
		return new ParseSuccess(successFn(this.value), this.stream);
	}

	chain<S>(
		fn: (val: T, stream: ParserStream) => ParseResult<S>
	): ParseResult<S> {
		return fn(this.value, this.stream);
	}

	fold<S>(
		successFn: (res: ParseSuccess<T>) => S,
		failFn: (res: ParseFailure) => S
	) {
		return successFn(this);
	}
}

export class ParseFailure implements ParseResultI<string> {
	constructor(public value: string, public stream: ParserStream) {}

	map<S>(fn: (arg: any) => S) {
		return this;
	}

	bimap<S>(successFn: (arg: any) => S, failFn: (error: string) => string) {
		return new ParseFailure(failFn(this.value), this.stream);
	}

	chain<S>(
		fn: (val: any, stream: ParserStream) => ParseResult<S>
	): ParseResult<any> {
		return this;
	}

	fold<S>(
		successFn: (res: ParseSuccess<any>) => S,
		failFn: (res: ParseFailure) => S
	) {
		return failFn(this);
	}
}
