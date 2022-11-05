import { testParser } from "teg-parser/testParser";
import { blockquote } from "./blockquote";

describe("Blockquote", () => {
	testParser(
		"Blockquote works",
		blockquote,
		`> Hello
> *bold*\`code\``,
		{
			type: "blockquote",
			content: [
				[{ type: "plain", content: "Hello" }],
				[
					{ type: "bold", content: "bold" },
					{ type: "code", content: "code" },
				],
			],
		}
	);

	testParser.todo("More blockquote tests");
});
