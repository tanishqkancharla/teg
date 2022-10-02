import { char } from "./char";
import { maybe } from "./maybe";
import { testParser } from "./testParser";

describe("maybe", () => {
	const parser = maybe(char("a"));

	testParser("works", parser, "a", "a");
	testParser("works on not matching", parser, "b", undefined, false);
});

it.todo("str");

it.todo("between");

it.todo("prefix");

it.todo("suffix");
it.todo("takeUntilAfter");
