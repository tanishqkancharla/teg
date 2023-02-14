import { any, end } from "./any"
import { testParser } from "./testParser"

describe("any", () => {
	const test = testParser(any)

	it("works", () => {
		test.parsePartial("Hi", "H")
	})

	it("fails on empty", () => {
		test.fails("")
	})
})

describe("end", () => {
	const test = testParser(end)

	it("works", () => {
		test.parses("", null)
	})

	it("Fails on nonempty", () => {
		test.fails("hi")
	})
})
