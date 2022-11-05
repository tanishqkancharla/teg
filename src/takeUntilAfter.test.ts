import { char } from "./char";
import { sequence } from "./sequence";
import { str } from "./str";
import { takeUntilAfter, takeUpTo } from "./takeUntilAfter";
import { testParser } from "./testParser";

describe("takeUntilAfter", () => {
	const charTest = testParser(takeUntilAfter(char("b")));

	it("works", () => charTest.works("aaab", "aaa"));

	it("fails on non-match", () => charTest.fails("aaa"));

	const stringTest = testParser(takeUntilAfter(str("def")));

	it("works with strings", () => stringTest.works("abcdef", "abc"));
});

describe("takeUpTo", () => {
	const parser = takeUpTo(char("b"));

	testParser("works", parser, "aaab", "aaa", false);

	const stringParser = takeUpTo(str("def"));

	testParser("works", stringParser, "abcdef", "abc", false);

	const sequenceWithTakeUpTo = sequence([
		takeUpTo(str("bbb")),
		str("bbb"),
		str("aaa"),
	]);

	testParser("works with str", sequenceWithTakeUpTo, "aaabbbaaa", [
		"aaa",
		"bbb",
		"aaa",
	]);
});
