import { between } from "./between";
import { char } from "./char";
import { testParser, testParserFails } from "./testParser";

describe("between", () => {
	const parser = between(char("a"), char("b"), char("c"));

	testParser("works", parser, "abc", "b");

	testParserFails("fails when prefix doesn't match", parser, "dbc");

	testParserFails("fails when middle doesn't match", parser, "adc");

	testParserFails("fails when suffix doesn't match", parser, "abd");
});
