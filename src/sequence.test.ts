import { assert, assertEqual } from "./assertUtils";
import { char } from "./char";
import { isParseFailure, isParseSuccess } from "./parseUtils";
import { sequence } from "./sequence";

describe("sequence", () => {
	const parser = sequence([char("a"), char("b"), char("c")]);

	it("works", () => {
		const result = parser.run("abc");

		assert.ok(isParseSuccess(result));

		const { value } = result;
		assertEqual(value, ["a", "b", "c"]);
	});

	it("fails", () => {
		const result = parser.run("bac");

		assert.ok(isParseFailure(result));
	});
});
