import { Parser, str } from "teg-parser";

export type DividerBlock = {
	type: "divider";
};

export const dividerParser: Parser<DividerBlock> = str("---\n").map(() => ({
	type: "divider",
}));
