# Teg

WARNING: This is currently in beta as I finalize out the API, write docs, and examples.

Teg is a tiny declarative parser toolkit written in Typescript. It aims to be a semantic and approachable library for parsing. Teg's semantics are mostly based off PEGS: [Parsing Expression Grammers](https://en.wikipedia.org/wiki/Parsing_expression_grammar)

* 0 dependencies
* Browser or Node
* 4kb minified (but highly tree-shakeable!)
* Well-tested
* Straightforward and semantic by default
* But also powerful and composable API.

## Install

```sh
npm install teg-parser
```

## Usage

```ts
import { prefix, str, line } from "teg-parser"

/** Parse markdown level 1 headings */
const h1Parser = prefix(str("# "), line);

const result = h1Parser.run("# heading\n");

console.log(result.content) // Prints "heading"
```

Often, you'll want to do some processing on a successful parse. To make this ergonomic, parsers define a `map` function that will let you transform successfully parsed content.

```ts
import {sequence, str, maybe, line, takeUntilAfter } from "teg-parser"

type CodeBlockToken = {
  lang: string | undefined
  content: string
}

/** Parse markdown codeblocks */
const codeBlockParser: Parser<CodeBlockToken> = sequence([
  str("```"),
  maybe(line), // Parse the language
  takeUntilAfter(str("\n```\n"))
])
  .map(([_, lang, content]) => ({ lang, content }))

const result = codeBlockParser.run(
`
\`\`\`ts
const code = runCode();
\`\`\`
`
);

assert.equal(
  result.content,
  {
    lang: "ts",
    content: "const code = runCode();"
  }
)

```

Since it's written in typescript, types are inferred as much as possible.

Much of the idea comes from [Chet Corcos's article on parsers](https://medium.com/@chetcorcos/introduction-to-parsers-644d1b5d7f3d). Although `Parser`s currently implement `bimap`, `fold`, and `chain` methods as described in the article, I haven't found them as useful in real-world usage, and may remove them or change them.

## ESM and CJS

`teg` comes with out of the box support for both ESM and CJS. However, a lot of parsers in teg are just simple utilities, so if you use ESM, you will be probably be able to tree-shake away a significant portion of the library.

## Combinators

```tsx
/** Matches a string */
export const str = <T extends string>(str: T) => Parser<T>
```
```tsx
/**
 * Match the given parser n or more times, with an optional delimiter parser
 * in between.
 */
const nOrMore: <T, D>(
	n: number,
	parser: Parser<T>,
	delimiter?: Parser<D>
) => Parser<T[]>
/**
 * Match the given parser zero or more times, with an optional delimiter
 * NOTE: this will always succeed.
 */
const zeroOrMore: <T, D>(parser: Parser<T>, delimiter?: Parser<D>) => Parser<T[]>
/**
 * Match the given parser one or more times, with an optional delimiter
 */
const oneOrMore: <T, D>(parser: Parser<T>, delimiter?: Parser<D>) => Parser<T[]>
```
```tsx
/** Matches exactly one of the given parsers, checked in the given order */
const oneOf: <ParserArray extends Parser<any>[]>(
	parsers: ParserArray
) => ParserArray[number]
```
```tsx
/**
 * Match the given parsers in sequence
 *
 * @example
 * sequence([char("a"), char("b"), char("c")]) => Parser<"abc">
 */
const sequence: (
	parsers: Parser[],
	delimiter?: Parser
) => Parser
```
```tsx
/**
 * Look ahead in the stream to match the given parser.
 * If it succeeds, it consumes no tokens.
 */
const lookahead: <T>(parser: Parser<T>) => Parser<T>
```
```tsx
/**
 * Tries matching a parser, returns undefined if it fails
 * NOTE: This parser always succeeds
 */
const maybe: <T>(parser: Parser<T>) => Parser<T | undefined>
```
```tsx
/**
 * Only matches the middle parser if it is surrounded by the `left` and `right`
 * parsers
 *
 * @example
 * between(char("a"), char("b"), char("c")) => Parser<"b"> // Matches "abc"
 */
const between: <L, T, R>(
	left: Parser<L>,
	parser: Parser<T>,
	right: Parser<R>
) => Parser<T>
/**
 * Only matches the given `parser` if it is prefixed by `prefix`
 *
 * @example
 * prefix(char("a"), char("b")) => Parser<"b"> // Matches "ab"
 */
const prefix: <P, T>(prefix: Parser<P>, parser: Parser<T>) => Parser<T>
/**
 * Only matches the given `parser` if it is suffixed by `suffix`
 *
 * @example
 * suffix(char("b"), char("c")) => Parser<"b"> // Matches "bc"
 */
const suffix: <T, S>(parser: Parser<T>, suffix: Parser<S>) => Parser<T>
```
```tsx
/**
 * Keep consuming until the given parser succeeds.
 * Returns all the characters that were consumed before the parser succeded.
 *
 * @example
 * `takeUntilAfter(char("\n"))` takes until after the newline but
 * doesn't include the newline itself in the result
 */
const takeUntilAfter: <T>(parser: Parser<T>) => Parser<string>
```

## Built-in parsers

```tsx
/**
 * Takes the first sentence in the stream
 * i.e. up to (and including) the first newline
 */
const line = takeUntilAfter(char("\n"));
/** Matches a single lowercase letter */
const lower: Parser<string>
/** Matches a single uppercase letter */
const upper: Parser<string>
/** Matches a single letter, case insensitive */
const letter: Parser<string>
/** Match a single digit from 0 to 9 */
const digit: Parser<string>
/** Match a single hexadecimal digit (0-9, A-F), case insensitive */
const hexDigit: Parser<string>
/** Match a single letter or digit */
const alphaNumeric: Parser<string>
```

## Testing parsers

Teg ships utilities to test parsers at "teg-parser/testParser". Its exports are:

```tsx
export function testParser<T>(
	name: string,
	parser: Parser<T>,
	content: string,
	expected: T,
  assertEmpty = true
)

export function testParserFails<T>(
	name: string,
	parser: Parser<T>,
	content: string
)
```

## Name

(**T**iny or **T**yped)  Parser **E**xpression **G**rammer

## Author

[Tanishq Kancharla](https://tanishqkancharla.dev)

Please make an issue on Github or email/dm me if you have feedback or suggestions!

[Github](https://github.com/tanishqkancharla/teg)
