import { lookahead } from "./lookahead"
import { testParser } from "./testParser"
import { text } from "./text"

describe("lookahead", () => {
	it("works", () => {
		testParser(lookahead(text("a"))).matches("a")
	})
})
