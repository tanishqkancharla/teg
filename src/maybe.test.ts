import { maybe } from "./maybe"
import { testParser } from "./testParser"
import { text } from "./text"

describe("maybe", () => {
	const parser = testParser(maybe(text("a")))

	it("works", () => {
		parser.parses("a", "a")
	})

	it("works on non-match", () => {
		parser.parsePartial("b", undefined)
	})
})
