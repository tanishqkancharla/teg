import { assert, assertEqual } from "./assertUtils"
import { Parser } from "./Parser"
import { isParseFailure, logResult } from "./parseUtils"

class ParseTester<T> {
	constructor(private parser: Parser<T>) {}

	parses(content: string, expected: T, assertEmpty = true) {
		const result = this.parser.run(content)

		const resultLog = logResult(result)

		assert(result.success, `Expected parse to be sucessful: ${resultLog}`)

		if (assertEmpty) {
			assert(
				result.stream.isEmpty(),
				`Expected parse stream to be empty: ${resultLog}`
			)
		}

		assertEqual(
			result.value,
			expected,
			`Expected parse result to be ${expected}: ${resultLog}`
		)
	}

	matches(content: string) {
		const result = this.parser.run(content)

		const resultLog = logResult(result)

		assert(result.success, `Expected parse to be sucessful: ${resultLog}`)
	}

	fails(content: string) {
		const result = this.parser.run(content)

		assert(
			isParseFailure(result),
			`Expected parse to fail but it succeeded: ${logResult(result)}`
		)
	}
}

export function testParser<T>(parser: Parser<T>) {
	return new ParseTester(parser)
}
