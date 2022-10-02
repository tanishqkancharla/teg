// ============================================================================
// Heading
// ============================================================================

import { line, oneOf, Parser, prefix, str } from "teg-parser";

export type HeadingBlock = {
	type: "heading";
	level: number;
	content: string;
};

const h1Parser: Parser<HeadingBlock> = prefix(str("# "), line)
	.withErrorScope("Heading 1")
	.map((content) => ({ type: "heading", level: 1, content }));

const h2Parser: Parser<HeadingBlock> = prefix(str("# "), line)
	.withErrorScope("Heading 1")
	.map((content) => ({ type: "heading", level: 1, content }));

const h3Parser: Parser<HeadingBlock> = prefix(str("# "), line)
	.withErrorScope("Heading 1")
	.map((content) => ({ type: "heading", level: 1, content }));

export const heading: Parser<HeadingBlock> = oneOf([
	h1Parser,
	h2Parser,
	h3Parser,
]);
