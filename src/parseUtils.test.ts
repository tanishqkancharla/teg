import { assert, assertEqual } from "./assertUtils";
import { char } from "./char";
import { maybe } from "./maybe";
import { isParseSuccess } from "./parseUtils";
import { line } from "./takeUntilAfter";
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

describe("line", () => {
	testParser("works", line, "a sentence\n", "a sentence");

	it("multiple sentences", () => {
		let result = line.run("a sentence\na second sentence\n");

		assert.ok(isParseSuccess(result));
		assertEqual(result.value, "a sentence");

		result = line.run(result.stream);

		assert.ok(isParseSuccess(result));

		assertEqual(result.value, "a second sentence");
	});
});
