import { char } from "./char";
import { maybe } from "./maybe";
import { testParser } from "./testParser";

describe("maybe", () => {
	const parser = testParser(maybe(char("a")));

	it("works", () => {
		parser.parses("a", "a");
	});

	it("works on non-match", () => {
		parser.parses("b", undefined, false);
	});
});
