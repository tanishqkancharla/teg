import { assert, assertEqual } from "./assertUtils";
import { char } from "./char";
import { maybe } from "./maybe";
import { isParseSuccess } from "./parseUtils";
import { line } from "./takeUntilAfter";

describe("maybe", () => {
	const parser = maybe(char("a"));

	it("works", () => {
		const result = parser.run("a");

		assert.ok(isParseSuccess(result));
		const { value, stream } = result;

		assert.ok(stream.isEmpty);
		assertEqual(value, "a");
	});

	it("fails", () => {
		const result = parser.run("b");

		assert.ok(isParseSuccess(result));
		const { value, stream } = result;

		assert.ok(!stream.isEmpty);
		assertEqual(value, undefined);
	});
});

it.todo("str");

it.todo("between");

it.todo("prefix");

it.todo("suffix");
it.todo("takeUntilAfter");

describe("line", () => {
	it("works", () => {
		const result = line.run("a sentence\n");

		assert.ok(isParseSuccess(result));
		const { value } = result;

		assertEqual(value, "a sentence");
	});

	it("multiple sentences", () => {
		let result = line.run("a sentence\na second sentence\n");

		assert.ok(isParseSuccess(result));
		assertEqual(result.value, "a sentence");

		result = line.run(result.stream);

		assert.ok(isParseSuccess(result));

		assertEqual(result.value, "a second sentence");
	});
});
