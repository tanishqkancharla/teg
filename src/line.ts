import { end } from "./any"
import { char } from "./char"
import { oneOf } from "./oneOf"
import { takeUpTo } from "./takeUntilAfter"

/**
 * Takes the first sentence in the stream
 * i.e. up to (but not including) the first newline
 */

export const line = takeUpTo(oneOf([char("\n"), end]))
