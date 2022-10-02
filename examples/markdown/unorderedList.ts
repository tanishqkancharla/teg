import { char, line, maybe, oneOrMore, Parser, prefix, str } from "teg-parser";

// Recursive types going on here, since list items can have their own internal
// unordered list
type ListItemContent = string | [string, UnorderedListBlock];
type UnorderedListContent = ListItemContent[];

export type UnorderedListBlock = {
	type: "unorderedList";
	listItems: UnorderedListContent;
};

export const indentedListItemParser = (
	indent: number
): Parser<ListItemContent> =>
	prefix(str("  ".repeat(indent) + "- "), line)
		.withErrorScope("Indented List Item")
		.chain((firstContent) =>
			maybe(prefix(char("\n"), indentedUnorderedListParser(indent + 1))).map(
				(indentedList) => [firstContent, indentedList] as const
			)
		)
		.map(([firstContent, indentedList]) =>
			indentedList ? [firstContent, indentedList] : firstContent
		);

export const indentedUnorderedListParser = (
	indent: number
): Parser<UnorderedListBlock> =>
	oneOrMore(indentedListItemParser(indent), char("\n"))
		.withErrorScope("Indented Unordered List")
		.map((listItems) => ({
			type: "unorderedList",
			listItems,
		}));

export const unorderedList: Parser<UnorderedListBlock> =
	indentedUnorderedListParser(0).withErrorScope("Unordered List");
