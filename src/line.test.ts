import { char } from "./char";
import { line } from "./line";
import { oneOrMore } from "./nOrMore";
import { testParser } from "./testParser";

describe("line", () => {
	const test = testParser(line);

	it("works", () => test.parses("a sentence\n", "a sentence", false));

	const multipleSentences = testParser(oneOrMore(line, char("\n")));

	it("multiple sentences", () => {
		multipleSentences.parses(
			"a sentence\na second sentence\n",
			["a sentence", "a second sentence"],
			false
		);
	});

	it("works till end", () => {
		test.parses("a sentence", "a sentence");
	});
});
