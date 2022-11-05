import { testParser } from "teg-parser/testParser";
import { divider } from "./divider";

describe.only("Divider", () => {
	testParser("Divider works", divider, `---`, {
		type: "divider",
	});
});
