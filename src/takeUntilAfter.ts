import { suffix } from "./between";
import { char } from "./char";
import { lookahead } from "./lookahead";
import { zeroOrMore } from "./nOrMore";
import { not } from "./not";
import { Parser } from "./Parser";
import { concat } from "./parseUtils";

/**
 * Keep consuming until the given parser succeeds.
 * Returns all the characters that were consumed before the parser succeded.
 *
 * @example
 * `takeUntilAfter(char("\n"))` takes until after the newline but
 * doesn't include the newline itself in the result
 */
export const takeUntilAfter = <T>(parser: Parser<T>): Parser<string> =>
	suffix(zeroOrMore(not(parser)), parser).map(concat);

export const takeUpTo = <T>(parser: Parser<T>): Parser<string> =>
	suffix(zeroOrMore(not(parser)), lookahead(parser)).map(concat);

/**
 * Takes the first sentence in the stream
 * i.e. up to (but not including) the first newline
 */
export const line = takeUpTo(char("\n"));
