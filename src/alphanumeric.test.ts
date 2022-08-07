import { letter, lower, upper } from "./alphanumeric";
import { testParser, testParserFails } from "./testParser";

describe("letter", () => {
	describe("lower", () => {
		testParser("works", lower, "h", "h");
		testParserFails("fails on uppercase", lower, "H");
	});

	describe("upper", () => {
		testParser("works", upper, "H", "H");
		testParserFails("fails on lowercase", upper, "h");
	});

	testParser("works on uppercase", letter, "H", "H");
	testParser("works on lowercase", letter, "h", "h");
	testParserFails("fails on empty", letter, "");
});

testParser.todo("digit");
testParser.todo("hexDigit");
testParser.todo("alphaNumeric");
