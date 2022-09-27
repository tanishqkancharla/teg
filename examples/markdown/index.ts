// ============================================================================
// Markdown Doc
// ============================================================================

import { BlockquoteBlock } from "./blockquote";
import { DividerBlock } from "./divider";
import { HeadingBlock } from "./heading";
import { ParagraphBlock } from "./paragraph";
import { UnorderedListBlock } from "./unorderedList";

type MarkdownBlock =
	| HeadingBlock
	| ParagraphBlock
	| UnorderedListBlock
	| BlockquoteBlock
	| DividerBlock;
// | OrderedListBlock
// | ImageBlock;
