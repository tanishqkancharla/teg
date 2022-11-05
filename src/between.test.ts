import { between } from "./between";
import { char } from "./char";
import { testParser } from "./testParser";

describe("between", () => {
	const parser = testParser(between(char("a"), char("b"), char("c")));

	it("works", () => {
		parser.parses("abc", "b");
	});

	it("fails when prefix doesn't match", () => {
		parser.fails("dbc");
	});

	it("fails when middle doesn't match", () => {
		parser.fails("adc");
	});

	it("fails when suffix doesn't match", () => {
		parser.fails("abd");
	});
});
