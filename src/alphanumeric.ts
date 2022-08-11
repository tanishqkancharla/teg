import { oneOf } from "./oneOf";
import { Parser } from "./Parser";
import { ParseFailure, ParseSuccess } from "./ParseResult";

const lowerLetters = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

/** Matches a single lowercase letter */
export const lower = new Parser((stream) => {
	const value = stream.head();
	if (lowerLetters.includes(value)) {
		return new ParseSuccess(value, stream.move(1));
	}
	return new ParseFailure(`${value} was not a lowercase letter`, stream);
}).withErrorScope("lower");

const upperLetters = lowerLetters.map((char) => char.toUpperCase());

/** Matches a single uppercase letter */
export const upper = new Parser((stream) => {
	const value = stream.head();
	if (upperLetters.includes(value)) {
		return new ParseSuccess(value, stream.move(1));
	}
	return new ParseFailure(`${value} was not a uppercase letter`, stream);
}).withErrorScope("upper");

/** Matches a single letter, case insensitive */
export const letter = oneOf([lower, upper]).withErrorScope("letter");

const digitChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** Match a single digit from 0 to 9 */
export const digit = new Parser((stream) => {
	const value = stream.head();
	if (digitChars.includes(value)) {
		return new ParseSuccess(value, stream.move(1));
	}
	return new ParseFailure(`${value} was not a digit`, stream);
}).withErrorScope("digit");

const hexLetterChars = lowerLetters.slice(0, 6);
const hexDigitChars = [
	...digitChars,
	...hexLetterChars,
	...hexLetterChars.map((char) => char.toUpperCase()),
];

/** Match a single hexadecimal digit (0-9, A-F), case insensitive */
export const hexDigit = new Parser((stream) => {
	const value = stream.head();
	if (hexDigitChars.includes(value)) {
		return new ParseSuccess(value, stream.move(1));
	}
	return new ParseFailure(`${value} was not a digit`, stream);
}).withErrorScope("hexDigit");

/** Match a single letter or digit */
export const alphaNumeric = oneOf([letter, digit]).withErrorScope(
	"alphaNumeric"
);
