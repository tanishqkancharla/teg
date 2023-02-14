import { oneOf } from "./oneOf"
import { testParser } from "./testParser"
import { text } from "./text"

describe("oneOf", () => {
	const parser = testParser(oneOf([text("a"), text("b"), text("c")]))

	it("works", () => {
		parser.parses("a", "a")
		parser.parses("b", "b")
		parser.parses("c", "c")
	})

	it("fails when no match", () => {
		parser.fails("d")
	})
})
