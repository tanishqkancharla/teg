import { zeroOrMore } from "./nOrMore"
import { oneOf } from "./oneOf"
import { concat } from "./parseUtils"
import { text } from "./text"

export const whitespace = zeroOrMore(
	oneOf([text("\n"), text(" "), text("\t"), text("\r")])
)
	.map(concat)
	.withErrorScope("whitespace")
