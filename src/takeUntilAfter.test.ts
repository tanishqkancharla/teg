import { takeUntilAfter, takeUpTo } from "./takeUntilAfter"
import { testParser } from "./testParser"
import { text } from "./text"

describe("takeUntilAfter", () => {
	const charTest = testParser(takeUntilAfter(text("b")))

	it("works", () => charTest.parses("aaab", "aaa"))

	it("fails on non-match", () => charTest.fails("aaa"))

	const stringTest = testParser(takeUntilAfter(text("def")))

	it("works with strings", () => stringTest.parses("abcdef", "abc"))
})

describe("takeUpTo", () => {
	it("works", () => {
		const test = testParser(takeUpTo(text("b")))
		test.parsePartial("aaab", "aaa")
	})

	it("works", () => {
		const test = testParser(takeUpTo(text("def")))
		test.parsePartial("abcdef", "abc")
	})
})
