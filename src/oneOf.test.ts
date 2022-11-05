import { char } from "./char";
import { oneOf } from "./oneOf";
import { testParser } from "./testParser";

describe("oneOf", () => {
	const parser = testParser(oneOf([char("a"), char("b"), char("c")]));

	it("works", () => {
		parser.parses("a", "a");
		parser.parses("b", "b");
		parser.parses("c", "c");
	});

	it("fails when no match", () => {
		parser.fails("d");
	});
});
