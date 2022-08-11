import { char } from "./char";
import { nOrMore, zeroOrMore } from "./nOrMore";
import { str } from "./str";
import { testParser, testParserFails } from "./testParser";

describe("nOrMore", () => {
	const parser = nOrMore(3, char("a"));

	testParser("works", parser, "aaaa", ["a", "a", "a", "a"]);

	testParser("works when n is equal", parser, "aaa", ["a", "a", "a"]);

	testParserFails("fails when n is less", parser, "aa");

	const parserWithDelim = nOrMore(3, char("a"), char("b"));

	testParser("Works when delimited", parserWithDelim, "ababa", ["a", "a", "a"]);

	testParserFails("Fails when delimiter not present", parserWithDelim, "abaa");
});

describe("zeroOrMore", () => {
	describe("Single character", () => {
		const parser = zeroOrMore(char("a"));

		testParser("works", parser, "aaaa", ["a", "a", "a", "a"]);

		testParser("succeeds when empty", parser, "", []);
	});

	describe("Multiple characters", () => {
		const parser = zeroOrMore(str("abba"));

		testParser("works", parser, "abba", ["abba"]);

		testParser("succeeds when empty", parser, "", []);

		const parserWithDelim = zeroOrMore(str("abba"), char("C"));

		testParser("Works when delimited", parserWithDelim, "abbaCabba", [
			"abba",
			"abba",
		]);
	});
});
