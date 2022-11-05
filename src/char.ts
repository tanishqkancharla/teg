import { Parser } from "./Parser"
import { ParseFailure, ParseSuccess } from "./ParseResult"

/**
 * Consume a single amtching character.
 * This is functionally equivalent to `str`, it differs only in semantics
 */
export const char = <Char extends string>(c: Char): Parser<Char> =>
	new Parser((stream) => {
		const value = stream.head() as Char | undefined

		if (value === c) {
			return new ParseSuccess(value, stream.move(1))
		}

		return new ParseFailure(`Char did not match ${JSON.stringify(c)}`, stream)
	}, `char ("${c}")`)
