import { testParser } from "teg-parser/testParser";
import { unorderedListParser } from "./unorderedList";

describe("unorderedList", () => {
	testParser("works", unorderedListParser, `- list item 1`, {
		type: "unorderedList",
		listItems: ["list item 1"],
	});

	testParser(
		"works with multiple list items",
		unorderedListParser,
		`- list item 1
- list item 2
- list item 3`,
		{
			type: "unorderedList",
			listItems: ["list item 1", "list item 2", "list item 3"],
		}
	);

	testParser(
		"works with indented list items",
		unorderedListParser,
		`- list item 1
  - list item 1a
  - list item 1b
- list item 2
- list item 3`,
		{
			type: "unorderedList",
			listItems: [
				[
					"list item 1",
					{
						type: "unorderedList",
						listItems: ["list item 1a", "list item 1b"],
					},
				],
				"list item 2",
				"list item 3",
			],
		}
	);
});
