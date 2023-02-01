import { line, Parser, template, zeroOrMore } from "."
import { assert } from "./assertUtils"

describe("Readme example tests", () => {
	it("H1 Heading", () => {
		/** Parse markdown level 1 headings */
		const h1Parser = template`# ${line}`

		const result = h1Parser.run("# heading\n")

		assert(result.isSuccess())
		assert.deepEqual(result.value, ["heading"])

		const failResult = h1Parser.run("not a heading")

		assert(failResult.isFailure())
		assert.strictEqual(
			failResult.toString(),
			`
Parse Failure

|
| not a heading
| ^

Failed at index 0: Char did not match "#"
In middle of parsing char ("#") at 0
In middle of parsing literal (# ) at 0
In middle of parsing template at 0
`
		)
	})

	it("Code Blocks", () => {
		type Blockquote = {
			content: string
		}

		const blockquote: Parser<Blockquote> = zeroOrMore(template`> ${line}`)
			.map((lines) => lines.map(([line]) => line).join("\n"))
			.map((content) => ({ content }))

		const result = blockquote.run(
			`
> Line 1
> Line 2
> Line 3
`.trim()
		)

		assert(result.isSuccess())
		assert.deepEqual(result.value, {
			content: "Line 1\nLine 2\nLine 3",
		})
	})
})
