import { char } from "./char";
import { nOrMore, zeroOrMore } from "./nOrMore";
import { str } from "./str";
import { testParser } from "./testParser";

describe("nOrMore", () => {
	const parser = testParser(nOrMore(3, char("a")));

	it("works", () => {
		parser.parses("aaaa", ["a", "a", "a", "a"]);
	});

	it("works when n is equal", () => {
		parser.parses("aaa", ["a", "a", "a"]);
	});

	it("fails when n is less", () => {
		parser.fails("aa");
	});

	const parserWithDelim = testParser(nOrMore(3, char("a"), char("b")));

	it("Works with delimiter", () => {
		parserWithDelim.parses("ababa", ["a", "a", "a"]);
	});

	it("Rolls back when stream ends at a delimiter", () => {
		parserWithDelim.parses("ababab", ["a", "a", "a"], false);
	});

	it("Fails when delimiter not present", () => {
		parserWithDelim.fails("abaa");
	});
});

describe("zeroOrMore", () => {
	describe("Single character", () => {
		const parser = testParser(zeroOrMore(char("a")));

		it("Works", () => parser.parses("aaaa", ["a", "a", "a", "a"]));
		it("Succeeds when empty", () => parser.parses("", []));
	});

	describe("Multiple characters", () => {
		const parser = testParser(zeroOrMore(str("abba")));

		it("Works", () => parser.parses("abba", ["abba"]));
		it("Succeeds when empty", () => parser.parses("", []));

		const parserWithDelim = testParser(zeroOrMore(str("abba"), char("C")));

		it("Works when delimited", () => {
			parserWithDelim.parses("abbaCabba", ["abba", "abba"]);
		});
	});
});
