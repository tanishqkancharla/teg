import { char } from "./char";
<<<<<<< HEAD
import { sequence } from "./sequence";
import { str } from "./str";
import { takeUntilAfter, takeUpTo } from "./takeUntilAfter";
=======
import { oneOrMore } from "./nOrMore";
import { str } from "./str";
import { line, takeUntilAfter, takeUpTo } from "./takeUntilAfter";
>>>>>>> main
import { testParser, testParserFails } from "./testParser";

describe("takeUntilAfter", () => {
	const parser = takeUntilAfter(char("b"));

	testParser("works", parser, "aaab", "aaa");

	testParserFails("fails on non-match", parser, "aaa");

<<<<<<< HEAD
	const parserWithString = takeUntilAfter(str("bbb"));

	testParser("works with string", parserWithString, "aaabbb", "aaa");

	testParserFails("fails with string on non-match", parserWithString, "aaabb");
=======
	const stringParser = takeUntilAfter(str("def"));

	testParser("works", stringParser, "abcdef", "abc", true);
>>>>>>> main
});

describe("takeUpTo", () => {
	const parser = takeUpTo(char("b"));

	testParser("works", parser, "aaab", "aaa", false);

<<<<<<< HEAD
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
=======
	const stringParser = takeUpTo(str("def"));

	testParser("works", stringParser, "abcdef", "abc", false);
});

describe("line", () => {
	testParser("works", line, "a sentence\n", "a sentence", false);

	const parser = oneOrMore(line, char("\n"));

	testParser(
		"multiple sentences",
		parser,
		"a sentence\na second sentence\n",
		["a sentence", "a second sentence"],
		false
	);
>>>>>>> main
});
