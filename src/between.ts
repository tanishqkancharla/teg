import { Parser } from "./Parser";
import { sequence } from "./sequence";

export const between = <L, T, R>(
	left: Parser<L>,
	parser: Parser<T>,
	right: Parser<R>
): Parser<T> =>
	sequence([left, parser, right])
		.map((v) => v[1])
		.withErrorScope("between");

export const prefix = <P, T>(prefix: Parser<P>, parser: Parser<T>): Parser<T> =>
	sequence([prefix, parser])
		.map((v) => v[1])
		.withErrorScope("prefix");

export const suffix = <T, S>(parser: Parser<T>, suffix: Parser<S>): Parser<T> =>
	sequence([parser, suffix])
		.map((v) => v[0])
		.withErrorScope("suffix");
