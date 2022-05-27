import { assert, assertEqual } from "./assertUtils";
import { Parser } from "./Parser";
import { isParseSuccess, logResult } from "./parseUtils";

export function testParser<T>(
	name: string,
	parser: Parser<T>,
	content: `\n${string}`,
	expected: T
) {
	it(name, () => {
		const result = parser.run(content.trimStart());

		assert.ok(
			isParseSuccess(result),
			`PARSING TEST FAILED: \n${logResult(result)}
        `
		);
		assert.ok(
			result.stream.isEmpty,
			`PARSING TEST FAILED:
Ending stream was nonempty:
${logResult(result)}`
		);
		assertEqual(result.value, expected);
	});
}
