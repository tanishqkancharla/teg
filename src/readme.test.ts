import { line, Parser, template, zeroOrMore } from "."
import { assert } from "./assertUtils"

describe("Readme example tests", () => {
	it("H1 Heading", () => {
		/** Parse markdown level 1 headings */
		const h1Parser = template`# ${line}`

		const result = h1Parser.run("# heading\n")

		assert(result.isSuccess())
		assert.deepEqual(result.value, ["heading"])
	})

	it("Code Blocks", () => {
		type Blockquote = {
			content: string
		}

		const blockquote: Parser<Blockquote> = zeroOrMore(template`> ${line}`)
			.map((lines) => lines.map(([line]) => line).join("\n"))
			.map((content) => ({ content }))

		const result = blockquote.run(`> Line 1
> Line 2
> Line 3
`)

		assert(result.isSuccess())
		assert.deepEqual(result.value, {
			content: "Line 1\nLine 2\nLine 3",
		})
	})
})
