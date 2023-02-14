import { lookahead } from "./lookahead"
import { zeroOrMore } from "./nOrMore"
import { not } from "./not"
import { Parser } from "./Parser"
import { concat, takeFirst } from "./parseUtils"
import { template } from "./template"

/**
 * Keep consuming until after the given parser succeeds.
 * Returns all the characters that were consumed before the parser succeded.
 *
 * @example
 * `takeUntilAfter(text("\n"))` takes until after the newline but
 * doesn't include the newline itself in the result
 */
export const takeUntilAfter = <T>(parser: Parser<T>): Parser<string> =>
	template`${zeroOrMore(not(parser))}${parser}`.map(takeFirst).map(concat)

/**
 * Keep consuming until before the given parser succeeds.
 * Returns all the characters that were consumed before the parser succeded.
 *
 * @example
 * `takeUpTo(text("\n"))` takes all chars until before the newline
 */
export const takeUpTo = <T>(parser: Parser<T>): Parser<string> =>
	template`${zeroOrMore(not(parser))}${lookahead(parser)}`
		.map(takeFirst)
		.map(concat)
