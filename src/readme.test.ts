import { line, Parser, template, zeroOrMore } from "."
import { assert } from "./assertUtils"
import { outdent } from "./parseUtils"

describe("Readme examples", () => {
	it("H1 Heading", () => {
		/** Parse markdown level 1 headings */
		const h1Parser = template`# ${line}`

		const result = h1Parser.run("# heading\n")

		expect(result.isSuccess()).toEqual(true)
		assert.deepEqual(result.value, ["heading"])

		const failResult = h1Parser.run("not a heading")

		expect(failResult.isFailure()).toEqual(true)

		expect(failResult.toString()).toEqual(
			outdent(`

		    Parse Failure

		    | not a heading
		    | ^

		    Failed at index 0: Expected char "#", found "n"
		    In middle of parsing text("# ") at 0
		    In middle of parsing template(text("# "), line, text("")) at 0

		  `)
		)
	})

	it("Blockquotes", () => {
		type Blockquote = {
			content: string
		}

		const blockquote: Parser<Blockquote> = zeroOrMore(template`> ${line}`)
			.map((lines) => lines.map(([line]) => line).join("\n"))
			.map((content) => ({ content }))

		const result = blockquote.run(
			outdent(`
        > Line 1
        > Line 2
        > Line 3
      `)
		)

		assert(result.isSuccess())
		assert.deepEqual(result.value, {
			content: "Line 1\nLine 2\nLine 3",
		})
	})
})
