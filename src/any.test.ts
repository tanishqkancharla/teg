import { any, end } from "./any"
import { testParser } from "./testParser"

describe("any", () => {
	const parser = testParser(any)

	it("works", () => {
		parser.parses("Hi", "H", false)
	})

	it("fails on empty", () => {
		parser.fails("")
	})
})

describe("end", () => {
	const parser = testParser(end)

	it("works", () => {
		parser.parses("", null)
	})

	it("Fails on nonempty", () => {
		parser.fails("hi")
	})
})
