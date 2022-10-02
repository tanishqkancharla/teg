import { char } from "./char";
import { Parser } from "./Parser";
import { concat } from "./parseUtils";
import { sequence } from "./sequence";

/** Matches a string */
export const str = <T extends string>(str: T): Parser<T> =>
	sequence(str.split("").map(char))
		.map(concat)
		.withErrorScope(`Str ${str}`) as Parser<T>;
