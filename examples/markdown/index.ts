// ============================================================================
// Markdown Doc
// ============================================================================

import { char, oneOf, oneOrMore, Parser } from "teg-parser";
import { blockquote, BlockquoteBlock } from "./blockquote";
import { divider, DividerBlock } from "./divider";
import { heading, HeadingBlock } from "./heading";
import { image, ImageBlock } from "./image";
import { paragraph, ParagraphBlock } from "./paragraph";
import { unorderedList, UnorderedListBlock } from "./unorderedList";

type MarkdownBlock =
	| HeadingBlock
	| ParagraphBlock
	| UnorderedListBlock
	| BlockquoteBlock
	| DividerBlock
	| ImageBlock;
// | OrderedListBlock

type MarkdownDoc = {
	blocks: MarkdownBlock[];
};

const block: Parser<MarkdownBlock> = oneOf([
	heading,
	paragraph,
	unorderedList,
	blockquote,
	divider,
	image,
]);

export const markdownDoc: Parser<MarkdownDoc> = oneOrMore(
	block,
	char("\n")
).map((blocks) => {
	return { blocks };
});
