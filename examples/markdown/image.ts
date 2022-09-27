import { between, char, Parser, prefix, sequence } from "teg-parser/index";

export type ImageBlock = {
	type: "image";
	alt: string;
	url: string;
};

export const image: Parser<ImageBlock> = prefix(
	char("!"),
	sequence([between(char("["))])
);
