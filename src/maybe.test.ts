import { char } from "./char";
import { maybe } from "./maybe";
import { testParser } from "./testParser";

describe("maybe", () => {
	const parser = maybe(char("a"));

	testParser("works", parser, "a", "a");
	testParser("works when no match", parser, "b", undefined, true);
});
