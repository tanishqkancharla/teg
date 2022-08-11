import { suffix } from "./between";
import { char } from "./char";
import { zeroOrMore } from "./nOrMore";
import { not } from "./not";
import { Parser } from "./Parser";
import { concat } from "./parseUtils";

/**
 * Keep consuming until the given parser succeeds.
 * Returns all the characters that were consumed before the parser succeded.
 * e.g. `takeUntilAfter(char("\n"))` takes until after the newline but
 * doesn't include the newline itself in the result
 */
export const takeUntilAfter = <T>(parser: Parser<T>): Parser<string> =>
	suffix(zeroOrMore(not(parser)), parser).map(concat);

/**
 * Takes the first sentence in the stream
 * i.e. up to (and including) the first newline
 */
export const line = takeUntilAfter(char("\n"));
