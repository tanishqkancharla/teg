import { testParser } from "./testParser"
import { text } from "./text"

describe("text", () => {
	const test = testParser(text("a"))

	it("works", () => test.parses("a", "a"))
	it("fails on non-matching text", () => test.fails("b"))

	it("works with longer text", () => {
		const test = testParser(text("abcdef"))
		test.parses("abcdef", "abcdef")
	})
})
