import { char } from "./char";
import { zeroOrMore } from "./nOrMore";
import { oneOf } from "./oneOf";
import { concat } from "./parseUtils";

export const whitespace = zeroOrMore(
	oneOf([char("\n"), char(" "), char("\t"), char("\r")])
).map(concat);
