import { testParser } from "teg-parser/testParser";
import { divider } from "./divider";

describe("Divider", () => {
	testParser("Divider works", divider, `---`, {
		type: "divider",
	});
});
