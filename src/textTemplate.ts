import { prefix, suffix } from "./between";
import { Parser } from "./Parser";
import { sequence } from "./sequence";
import { str } from "./str";
import { takeUpTo } from "./takeUntilAfter";

type HolesToString<Holes extends 0[]> = {
	[Key in keyof Holes]: string;
};

export function textTemplate<Holes extends 0[]>(
	strings: TemplateStringsArray,
	...holes: Holes
): Parser<HolesToString<Holes>> {
	const parsersForStrings = strings.map(str);

	console.log(parsersForStrings.map((parser) => parser.errorScope));

	const holeParsers = parsersForStrings
		.slice(0, -1)
		.map((parserForString, index) => {
			console.log({ parserForString });
			console.log({ next: parsersForStrings[index + 1] });
			return prefix(parserForString, takeUpTo(parsersForStrings[index + 1]));
		});

	console.log(holeParsers.map((parser) => parser.errorScope));

	const lastParser = parsersForStrings[parsersForStrings.length - 1];

	const textParser = suffix(sequence(holeParsers), lastParser);

	return textParser as Parser<HolesToString<Holes>>;
}
