import { char } from "./char"
import { Parser } from "./Parser"
import { concat } from "./parseUtils"
import { sequence } from "./sequence"

/** Matches a string */
export const literal = <T extends string>(value: T): Parser<T> =>
	sequence(value.split("").map(char))
		.map(concat)
		.withErrorScope(`literal (${value})`) as Parser<T>
