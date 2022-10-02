import { testParser } from "teg-parser/testParser";
import { heading } from "./heading";

describe("Heading", () => {
	testParser("Heading 1 works", heading, `# Heading 1`, {
		type: "heading",
		level: 1,
		content: "Heading 1",
	});

	testParser("Heading 2 works", heading, `## Heading 2`, {
		type: "heading",
		level: 2,
		content: "Heading 2",
	});

	testParser("Heading 3 works", heading, `### Heading 3`, {
		type: "heading",
		level: 3,
		content: "Heading 3",
	});
});
