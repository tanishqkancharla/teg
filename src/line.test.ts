import { line } from "./line"
import { oneOrMore } from "./nOrMore"
import { testParser } from "./testParser"

describe("line", () => {
	const test = testParser(line)

	it("works", () => test.parses("a sentence\n", "a sentence"))

	const multipleSentences = testParser(oneOrMore(line))

	it("multiple sentences", () => {
		multipleSentences.parses("a sentence\na second sentence\n", [
			"a sentence",
			"a second sentence",
		])
	})

	it("works till end", () => {
		test.parses("a sentence", "a sentence")
	})
})
