import { Parser, str } from "teg-parser";

export type DividerBlock = {
	type: "divider";
};

export const divider: Parser<DividerBlock> = str("---").map(() => ({
	type: "divider",
}));
