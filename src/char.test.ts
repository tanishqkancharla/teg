import { char } from "./char";
import { testParser } from "./testParser";

describe("char", () => {
	it("works", () => testParser(char("a")).parses("a", "a"));

	it("fails on non-matching char", () => testParser(char("a")).fails("b"));
});
