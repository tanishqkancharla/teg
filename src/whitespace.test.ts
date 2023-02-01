import { testParser } from "./testParser"
import { whitespace } from "./whitespace"

describe("whitespace", () => {
	const test = testParser(whitespace)

	it("Works", () => {
		test.parses(" ", " ")
	})

	it("Works on multiple different types", () => {
		test.parsePartial(" \n\t \r \t hello", " \n\t \r \t ")
	})
})
