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

		assert.ok(
			isParseSuccess(result),
			`Parsing test ${name} failed:
${logResult(result)}`
		);

		if (assertEmpty) {
			assert.ok(
				result.stream.isEmpty,
				`Parsing test "${name}" failed:
  Ending stream was nonempty:
  ${logResult(result)}`
			);
		}

		assertEqual(result.value, expected);
	});
}

testParser.todo = <T>(
	name: string,
	parser?: Parser<T>,
	content?: string,
	expected?: T
) => {
	it.todo(name);
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
