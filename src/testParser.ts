import { assert, assertEqual } from "./assertUtils"
import { Parser } from "./Parser"

class ParseTester<T> {
	constructor(private parser: Parser<T>) {}

	parses(content: string, expected: T) {
		const result = this.parser.run(content)

		const resultLog = result.toString()

		assert(result.isSuccess(), `Expected parse to be sucessful: ${resultLog}`)
		assert(
			result.stream.isEmpty(),
			`Expected parse stream to be empty after parsing.
(If you don't want to assert emptiness, use .parsePartial)
${resultLog}`
		)

		assertEqual(
			result.value,
			expected,
			`Expected parse result to be ${expected}: ${resultLog}`
		)
	}

	parsePartial(content: string, expected: T) {
		const result = this.parser.run(content)

		const resultLog = result.toString()

		assert(result.isSuccess(), `Expected parse to be sucessful: ${resultLog}`)

		assertEqual(
			result.value,
			expected,
			`Expected parse result to be ${expected}: ${resultLog}`
		)
	}

	matches(content: string) {
		const result = this.parser.run(content)

		const resultLog = result.toString()

		assert(result.isSuccess(), `Expected parse to be sucessful: ${resultLog}`)
	}

	fails(content: string) {
		const result = this.parser.run(content)

		assert(
			result.isFailure(),
			`Expected parse to fail but it succeeded: ${result.toString()}`
		)
	}
}

export function testParser<T>(parser: Parser<T>) {
	return new ParseTester(parser)
}
