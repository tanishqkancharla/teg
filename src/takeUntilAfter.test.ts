import { char } from "./char";
import { sequence } from "./sequence";
import { str } from "./str";
import { takeUntilAfter, takeUpTo } from "./takeUntilAfter";
import { testParser, testParserFails } from "./testParser";

describe("takeUntilAfter", () => {
	const parser = takeUntilAfter(char("b"));

	testParser("works", parser, "aaab", "aaa");

	testParserFails("fails on non-match", parser, "aaa");

	const parserWithString = takeUntilAfter(str("bbb"));

	testParser("works with string", parserWithString, "aaabbb", "aaa");

	testParserFails("fails with string on non-match", parserWithString, "aaabb");
});

describe("takeUpTo", () => {
	const parser = takeUpTo(char("b"));

	testParser("works", parser, "aaab", "aaa", false);

	const parserWithStr = takeUpTo(str("bbb"));

	testParser("works with str", parserWithStr, "aaabbbaaa", "aaa", false);

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
