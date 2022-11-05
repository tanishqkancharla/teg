import { char, oneOrMore, Parser, prefix, str } from "teg-parser";
import { RichTextContent, richTextParser } from "./richText";

export type BlockquoteBlock = {
	type: "blockquote";
	content: RichTextContent[];
};

export const blockquote: Parser<BlockquoteBlock> = oneOrMore(
	prefix(str("> "), richTextParser),
	char("\n")
).map((content) => ({ type: "blockquote", content }));
