import { char } from "./char";
import { sequence } from "./sequence";
import { testParser, testParserFails } from "./testParser";

describe("sequence", () => {
	const parser = sequence([char("a"), char("b"), char("c")]);

	testParser("works", parser, "abc", ["a", "b", "c"]);

	testParserFails("fails", parser, "bac");

	testParser.todo("Works when given delimiter");

	testParser.todo("Fails when delimiter doesn't match");
});
