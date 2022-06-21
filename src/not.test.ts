import { char } from "./char";
import { not } from "./not";
import { testParser, testParserFails } from "./testParser";

describe("not", () => {
	const parser = not(char("a"));

	testParser("works", parser, "b", "b");

	testParserFails("fails", parser, "a");
});
