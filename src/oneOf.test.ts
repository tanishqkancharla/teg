import { char } from "./char";
import { oneOf } from "./oneOf";
import { testParser, testParserFails } from "./testParser";

describe("oneOf", () => {
	const parser = oneOf([char("a"), char("b"), char("c")]);

	testParser("works", parser, "c", "c");

	testParserFails("fails when no match", parser, "d");
});
