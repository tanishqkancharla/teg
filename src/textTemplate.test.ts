import { testParser } from "./testParser";
import { textTemplate } from "./textTemplate";

describe("textTemplate", () => {
	const brackets = textTemplate`[${0}]`;

	testParser("works", brackets, "[hello]", ["hello"]);

	const link = textTemplate`[${0}](${0})`;

	testParser("multiple holes", link, "[hello](https://example.org)", [
		"hello",
		"https://example.org",
	]);

	const openBracket = textTemplate`[${0}`;

	testParser("hole at end works", openBracket, "[hello", ["hello"]);

	const multipleConsecutiveHoles = textTemplate`[${0}${0}]`;
});
