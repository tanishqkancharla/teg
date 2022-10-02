import { testParser } from "teg-parser/testParser";
import { image } from "./image";

describe("Image", () => {
	testParser("Image works", image, `![Alt text](https://example.org)`, {
		type: "image",
		alt: "Alt text",
		src: "https://example.org",
	});

	testParser.todo("More blockquote tests");
});
