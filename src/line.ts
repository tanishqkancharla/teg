import { end } from "./any"
import { char } from "./char"
import { oneOf } from "./oneOf"
import { takeUntilAfter } from "./takeUntilAfter"

/**
 * Takes the first sentence in the stream
 * i.e. up to the first newline
 * It will consume the newline, but it won't include it in the result
 */
export const line = takeUntilAfter(oneOf([char("\n"), end])).withErrorScope(
	"line"
)
