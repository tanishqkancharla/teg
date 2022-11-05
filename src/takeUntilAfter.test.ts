import { char } from "./char";
import { str } from "./str";
import { takeUntilAfter, takeUpTo } from "./takeUntilAfter";
import { testParser } from "./testParser";

describe("takeUntilAfter", () => {
	const charTest = testParser(takeUntilAfter(char("b")));

	it("works", () => charTest.parses("aaab", "aaa"));

	it("fails on non-match", () => charTest.fails("aaa"));

	const stringTest = testParser(takeUntilAfter(str("def")));

	it("works with strings", () => stringTest.parses("abcdef", "abc"));
});

describe("takeUpTo", () => {
	const test = testParser(takeUpTo(char("b")));

	it("works", () => {
		test.parses("aaab", "aaa", false);
	});

	it("works", () => {
		testParser(takeUpTo(str("def"))).parses("abcdef", "abc", false);
	});
});
