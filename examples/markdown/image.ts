import { Parser, prefix, sequence, str, takeUntilAfter } from "teg-parser";

export type ImageBlock = {
	type: "image";
	alt: string;
	src: string;
};

const delimited = (before: string, after: string) =>
	prefix(str(before), takeUntilAfter(str(after)));

export const image: Parser<ImageBlock> = sequence([
	str("!"),
	delimited("[", "]"),
	delimited("(", ")"),
]).map(([_, alt, src]) => {
	return {
		type: "image",
		alt,
		// You could check this src looks valid using `chain`
		src,
	};
});
