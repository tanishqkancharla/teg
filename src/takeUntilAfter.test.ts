import { char } from "./char"
import { literal } from "./literal"
import { takeUntilAfter, takeUpTo } from "./takeUntilAfter"
import { testParser } from "./testParser"

describe("takeUntilAfter", () => {
	const charTest = testParser(takeUntilAfter(char("b")))

	it("works", () => charTest.parses("aaab", "aaa"))

	it("fails on non-match", () => charTest.fails("aaa"))

	const stringTest = testParser(takeUntilAfter(literal("def")))

	it("works with strings", () => stringTest.parses("abcdef", "abc"))
})

describe("takeUpTo", () => {
	it("works", () => {
		const test = testParser(takeUpTo(char("b")))
		test.parsePartial("aaab", "aaa")
	})

	it("works", () => {
		const test = testParser(takeUpTo(literal("def")))
		test.parsePartial("abcdef", "abc")
	})
})
