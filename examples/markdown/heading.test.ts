import { testParser } from "teg-parser/testParser";
import { heading } from "./heading";

describe("Heading", () => {
	const test = testParser(heading);

	it("Heading 1 works", () => {
		test.works("# Heading 1", {
			type: "heading",
			level: 1,
			content: "Heading 1",
		});
	});

	it("Heading 2 works", () => {
		test.works("## Heading 2", {
			type: "heading",
			level: 2,
			content: "Heading 2",
		});
	});

	it("Heading 3 works", () => {
		test.works("### Heading 3", {
			type: "heading",
			level: 3,
			content: "Heading 3",
		});
	});
});
