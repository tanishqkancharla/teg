import { testParser } from "teg-parser/testParser";
import { unorderedList } from "./unorderedList";

describe("unorderedList", () => {
	testParser("works", unorderedList, `- list item 1\n`, {
		type: "unorderedList",
		listItems: ["list item 1"],
	});

	testParser(
		"works with multiple list items",
		unorderedList,
		`- list item 1
- list item 2
- list item 3
`,
		{
			type: "unorderedList",
			listItems: ["list item 1", "list item 2", "list item 3"],
		}
	);

	testParser(
		"works with indented list items",
		unorderedList,
		`- list item 1
  - list item 1a
  - list item 1b
- list item 2
- list item 3
`,
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
