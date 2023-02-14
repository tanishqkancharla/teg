import { end } from "./any"
// import { newline } from "./any"
import { oneOf } from "./oneOf"
import { takeUntilAfter } from "./takeUntilAfter"
import { text } from "./text"

/**
 * Takes the first sentence in the stream
 * i.e. up to the first newline
 * It will consume the newline, but it won't include it in the result
 */
export const line = takeUntilAfter(oneOf([text("\n"), end])).withErrorScope(
	"line"
)
