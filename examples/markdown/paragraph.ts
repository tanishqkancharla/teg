// ============================================================================
// Paragraph
// ============================================================================

import { Parser } from "teg-parser/index";
import { RichTextContent, richTextParser } from "./richText";

export type ParagraphBlock = {
	type: "paragraph";
	content: RichTextContent;
};

export const paragraph: Parser<ParagraphBlock> = richTextParser
	.withErrorScope("Paragraph")
	.map((content) => ({
		type: "paragraph",
		content,
	}));
