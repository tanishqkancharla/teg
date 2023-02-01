import { word } from "./alphanumeric"
import { template } from "./template"
import { testParser } from "./testParser"

describe("template", () => {
	it("With no parsers", () => {
		const test = testParser(template`hello`)
		test.parses("hello", [])
	})

	it("With one parser", () => {
		const test = testParser(template`hello ${word}`)

		test.parses("hello hi", ["hi"])
		test.parses("hello world", ["world"])
	})

	it("Larger with multiple parsers", () => {
		const test = testParser(template`import { ${word} } from "${word}"`)

		test.parses(`import { template } from "teg"`, ["template", "teg"])
	})
})
