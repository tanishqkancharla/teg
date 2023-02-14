import { not } from "./not"
import { testParser } from "./testParser"
import { text } from "./text"

describe("not", () => {
	const parser = testParser(not(text("a")))

	it("works", () => {
		parser.parses("b", "b")
	})

	it("fails on match", () => {
		parser.fails("a")
	})
})
