import { char } from "./char";
import { maybe } from "./maybe";
import { sequence } from "./sequence";
import { line } from "./takeUntilAfter";
import { testParser } from "./testParser";

describe("maybe", () => {
	const parser = maybe(char("a"));

	testParser("works", parser, "a", "a");
	testParser("works on not matching", parser, "b", undefined, false);
});

it.todo("str");

it.todo("between");

it.todo("prefix");

it.todo("suffix");
it.todo("takeUntilAfter");

describe("line", () => {
	testParser("works", line, "a sentence\n", "a sentence", false);

	const twoSentences = sequence([line, line], char("\n"));

	testParser(
		"multiple sentence",
		twoSentences,
		"a sentence\na second sentence\n",
		["a sentence", "a second sentence"],
		false
	);
});
