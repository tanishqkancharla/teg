import { char } from "./char";
import { line } from "./line";
import { oneOrMore } from "./nOrMore";
import { testParser } from "./testParser";

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
});
