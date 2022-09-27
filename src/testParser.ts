import { assert, assertEqual } from "./assertUtils";
import { Parser } from "./Parser";
import { isParseFailure, isParseSuccess, logResult } from "./parseUtils";

export function testParser<T>(
	name: string,
	parser: Parser<T>,
	content: string,
	expected: T,
	assertEmpty = true
) {
	it(name, () => {
		const result = parser.run(content);

		assert.ok(isParseSuccess(result), logResult(result));

		if (assertEmpty) {
			assert.ok(
				result.stream.isEmpty(),
				`Parse test "${name}" failed:
  Ending stream was nonempty:
  ${logResult(result)}`
			);
		}

		assertEqual(result.value, expected, logResult(result));
	});
}

testParser.todo = <T>(
	name: string,
	parser?: Parser<T>,
	content?: string,
	expected?: T,
	assertEmpty = true
) => {
	it.todo(name);
};

testParser.only = <T>(
	name: string,
	parser: Parser<T>,
	content: string,
	expected: T,
	assertEmpty = true
) => {
	it.only(name, () => {
		const result = parser.run(content);

		assert.ok(isParseSuccess(result), logResult(result));

		if (assertEmpty) {
			assert.ok(
				result.stream.isEmpty(),
				`Parse test "${name}" failed:
  Ending stream was nonempty:
  ${logResult(result)}`
			);
		}

		assertEqual(result.value, expected, logResult(result));
	});
};

export function testParserFails<T>(
	name: string,
	parser: Parser<T>,
	content: string
) {
	it(name, () => {
		const result = parser.run(content);

		assert.ok(
			isParseFailure(result),
			`Parsing test ${name} succeeded when it was supposed to fail:
${logResult(result)}`
		);
	});
}

testParserFails.todo = <T>(
	name: string,
	parser?: Parser<T>,
	content?: string
) => {
	it.todo(name);
};
