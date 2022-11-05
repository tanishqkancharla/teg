import { char } from "./char"
import { not } from "./not"
import { testParser } from "./testParser"

describe("not", () => {
	const parser = testParser(not(char("a")))

	it("works", () => {
		parser.parses("b", "b")
	})

	it("fails on match", () => {
		parser.fails("a")
	})
})
