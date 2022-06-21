import { char } from "./char";
import { testParser, testParserFails } from "./testParser";

describe("char", () => {
	testParser("works", char("a"), "a", "a");

	testParserFails("fails on non-matching char", char("a"), "b");
});
