import { char } from "./char";
import { sequence } from "./sequence";
import { testParser } from "./testParser";

describe("sequence", () => {
	const parser = testParser(sequence([char("a"), char("b"), char("c")]));

	it("works", () => {
		parser.parses("abc", ["a", "b", "c"]);
	});

	it("fails on non-match", () => {
		parser.fails("bac");
	});

	it.todo("Works with delimiter");

	it.todo("Fails when delimiter doesn't match");

	it.todo("Doesn't take last delimiter value if it exists");
});
