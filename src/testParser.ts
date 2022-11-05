import { assert, assertEqual } from "./assertUtils";
import { Parser } from "./Parser";
import { isParseFailure, isParseSuccess, logResult } from "./parseUtils";

class ParseTester<T> {
	constructor(private parser: Parser<T>) {}

	works(content: string, expected: T, assertEmpty = true) {
		const result = this.parser.run(content);
		assert(
			isParseSuccess(result),
			`Expected parse to be sucessful: ${logResult(result)}`
		);

		if (assertEmpty) {
			assert(
				result.stream.isEmpty(),
				`Expected parse stream to be empty: ${logResult(result)}`
			);
		}

		assertEqual(
			result.value,
			expected,
			`Expected parse result to be ${expected}: ${logResult(result)}`
		);
	}

	fails(content: string) {
		const result = this.parser.run(content);

		assert(
			isParseFailure(result),
			`Expected parse to fail but it succeeded: ${logResult(result)}`
		);
	}
}

export function testParser<T>(parser: Parser<T>) {
	return new ParseTester(parser);
}
