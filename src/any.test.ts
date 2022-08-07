import { any, end } from "./any";
import { testParser, testParserFails } from "./testParser";

describe("any", () => {
	testParser("works", any, "Hi", "H", false);

	testParserFails("fails on empty", any, "");
});

describe("end", () => {
	testParser("works", end, "", null);

	testParserFails("Fails on nonempty", end, "hi");
});
