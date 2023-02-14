import { sequence } from "./sequence"
import { testParser } from "./testParser"
import { text } from "./text"

describe("sequence", () => {
	const parser = testParser(sequence([text("a"), text("b"), text("c")]))

	it("works", () => {
		parser.parses("abc", ["a", "b", "c"])
	})

	it("fails on non-match", () => {
		parser.fails("bac")
	})

	it.todo("Works with delimiter")

	it.todo("Fails when delimiter doesn't match")

	it.todo("Doesn't take last delimiter value if it exists")
})
