import { Parser } from "./Parser"
import { sequence } from "./sequence"

/**
 * Only matches the middle parser if it is surrounded by the `left` and `right`
 * parsers
 *
 * @example
 * between(char("a"), char("b"), char("c")): Parser<"b"> // Matches "abc"
 */
export const between = <L, T, R>(
	left: Parser<L>,
	parser: Parser<T>,
	right: Parser<R>
): Parser<T> =>
	sequence([left, parser, right])
		.map((v) => v[1])
		.withErrorScope("between")

/**
 * Only matches the given `parser` if it is prefixed by `prefix`
 *
 * @example
 * prefix(char("a"), char("b")): Parser<"b"> // Matches "ab"
 */
export const prefix = <P, T>(prefix: Parser<P>, parser: Parser<T>): Parser<T> =>
	sequence([prefix, parser])
		.map((v) => v[1])
		.withErrorScope("prefix")

/**
 * Only matches the given `parser` if it is suffixed by `suffix`
 *
 * @example
 * suffix(char("b"), char("c")): Parser<"b"> // Matches "bc"
 */
export const suffix = <T, S>(parser: Parser<T>, suffix: Parser<S>): Parser<T> =>
	sequence([parser, suffix])
		.map((v) => v[0])
		.withErrorScope("suffix")
