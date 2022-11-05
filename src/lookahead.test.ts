import { char } from "./char";
import { lookahead } from "./lookahead";
import { testParser } from "./testParser";

describe("lookahead", () => {
	it("works", () => {
		testParser(lookahead(char("a"))).matches("a");
	});
});
