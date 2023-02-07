import { letter, lower, upper } from "./alphanumeric"
import { testParser } from "./testParser"

describe("alphanumeric", () => {
	describe("lower", () => {
		it("works", () => testParser(lower).parses("h", "h"))
		it("fails on uppercase", () => testParser(lower).fails("H"))
	})

	describe("upper", () => {
		it("works", () => testParser(upper).parses("H", "H"))
		it("fails on lowercase", () => testParser(upper).fails("h"))
	})

	describe("letter", () => {
		it("works on uppercase", () => testParser(letter).parses("H", "H"))
		it("works on lowercase", () => testParser(letter).parses("h", "h"))
		it("fails on digit", () => testParser(letter).fails("4"))
		it("fails on empty", () => testParser(letter).fails(""))
	})

	it.todo("digit")
	it.todo("hexDigit")
	it.todo("alphaNumeric")
})
