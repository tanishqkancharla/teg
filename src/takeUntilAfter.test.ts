import { char } from "./char";
import { str } from "./str";
import { takeUntilAfter, takeUpTo } from "./takeUntilAfter";
import { testParser, testParserFails } from "./testParser";

describe("takeUntilAfter", () => {
	const parser = takeUntilAfter(char("b"));

	testParser("works", parser, "aaab", "aaa");

	testParserFails("fails on non-match", parser, "aaa");

	const stringParser = takeUntilAfter(str("def"));

	testParser("works", stringParser, "abcdef", "abc", true);
});

describe("takeUpTo", () => {
	const parser = takeUpTo(char("b"));

	testParser("works", parser, "aaab", "aaa", false);

	const stringParser = takeUpTo(str("def"));

	testParser("works", stringParser, "abcdef", "abc", false);
});
