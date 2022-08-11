import { testParser } from "./testParser";
import { whitespace } from "./whitespace";

describe("whitespace", () => {
	testParser("works", whitespace, " ", " ");

	testParser(
		"works on multiple different types",
		whitespace,
		" \n\t \r \t hello",
		" \n\t \r \t ",
		false
	);
});
