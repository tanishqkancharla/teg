import { testParser } from "teg-parser/testParser"
import { cliConfig, cliParser } from "./simple-cli"

describe("Simple CLI config builder", () => {
	it("Works", () => {
		const config = cliConfig()
			.flag("hello")
			.flag("hello2")
			.keyValue("verbose", "1")
			.keyValue("verbose", "2")
			.keyValue("verbose", "3")
			.keyValue("key", "value")
			.build()

		expect(config).toEqual({
			flags: ["hello", "hello2"],
			keyValue: [
				{
					key: "verbose",
					options: ["1", "2", "3"],
				},
				{
					key: "key",
					options: ["value"],
				},
			],
		})
	})
})

describe("Simple CLI parser", () => {
	it("Works for flags", () => {
		const config = cliConfig().flag("hello").build()
		const testHello = testParser(cliParser(config))

		testHello.parses("command --hello", { hello: true })
		testHello.parses("command", {})
	})

	it("Works for key values", () => {
		const config = cliConfig()
			.keyValue("verbose", "1")
			.keyValue("verbose", "2")
			.keyValue("verbose", "3")
			.build()

		const testVerbose = testParser(cliParser(config))

		testVerbose.parses("command --verbose=1", { verbose: "1" })
		testVerbose.parses("command --verbose=3", { verbose: "3" })
		testVerbose.parses("command", {})
	})
})
