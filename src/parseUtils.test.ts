import { assert, assertEqual } from "./assertUtils";
import { ParseSuccess } from "./ParseResult";
import {
	char,
	isParseFailure,
	isParseSuccess,
	line,
	maybe,
	notChars,
	sequence,
	zeroOrMore,
} from "./parseUtils";

describe("char", () => {
	const parser = char("a");

	it("works", () => {
		const result = parser.run("a");

		assert.ok(result instanceof ParseSuccess);

		const { stream, value } = result;

		assert.ok(stream.isEmpty);
		assertEqual(value, "a");
	});

	it("fails", () => {
		const result = parser.run("b");
		assert.ok(isParseFailure(result));
	});
});

describe("notChars", () => {
	const parser = notChars(["a", "b", "c"]);

	it("works", () => {
		const result = parser.run("ddd");

		assert.ok(isParseSuccess(result));
	});

	it("fails", () => {
		let result = parser.run("a");
		assert.ok(isParseFailure(result));

		result = parser.run("abc");
		assert.ok(isParseFailure(result));
	});
});

describe("sequence", () => {
	const parser = sequence([char("a"), char("b"), char("c")] as const);

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

describe("zeroOrMore", () => {
	const parser = zeroOrMore(char("a"));

	it("works", () => {
		const result = parser.run("b");

		assert.ok(isParseSuccess(result));
		const { value } = result;

		assertEqual(value, []);
	});

	it("multiple characters", () => {
		const result = parser.run("aaa");

		assert.ok(isParseSuccess(result));
		const { value } = result;

		assertEqual(value, ["a", "a", "a"]);
	});
});

it.todo("str");

it.todo("between");

it.todo("prefix");

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
