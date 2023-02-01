# Teg

WARNING: This is currently in beta as I finalize out the API, write docs, and examples.

Teg is a tiny declarative parser toolkit written in Typescript. It aims to be a semantic and approachable library for parsing. Teg's semantics are mostly based off PEGS: [Parsing Expression Grammers](https://en.wikipedia.org/wiki/Parsing_expression_grammar)

* 0 dependencies
* Browser or Node
* 4.4kb minified (but highly tree-shakeable!)
* Well-tested
* Straightforward and semantic by default
* But also powerful and composable API.

## Install

```sh
npm install teg-parser
```

## Usage

```ts
import { template, line } from "teg-parser"

/** Parse markdown level 1 headings */
const h1Parser = template`# ${line}`

const result = h1Parser.run("# heading\n")

assert(result.isSuccess())
assert.deepEqual(result.value, ["heading"])

const failResult = h1Parser.run("not a heading")

assert(failResult.isFailure())
console.log(failResult)
/**
 * Logs
Parse Failure

|
| not a heading
| ^

Failed at index 0: Char did not match "#"
In middle of parsing char ("#") at 0
In middle of parsing literal (# ) at 0
In middle of parsing template at 0
 */
```

Often, you'll want to do some processing on a successful parse. To make this ergonomic, parsers define a `map` function that will let you transform successfully parsed content.

```ts
import { template, maybe, zeroOrMore, line, takeUntilAfter } from "teg-parser"

type Blockquote = {
  content: string
}

const blockquote: Parser<Blockquote> = zeroOrMore(template`> ${line}`)
  .map((lines) => lines.map(([line]) => line).join("\n"))
  .map((content) => ({ content }))

const result = blockquote.run(`> Line 1\n> Line 2\n> Line 3`)

assert(result.isSuccess())
assert.deepEqual(result.value, {
  content: "Line 1\nLine 2\nLine 3",
})

```

Since it's written in typescript, types are inferred as much as possible.

Much of the idea comes from [Chet Corcos's article on parsers](https://medium.com/@chetcorcos/introduction-to-parsers-644d1b5d7f3d). Although `Parser`s currently implement `bimap`, `fold`, and `chain` methods as described in the article, I haven't found them as useful in real-world usage, and may remove them or change them.

## Combinators

```tsx
/** Matches a literal string */
export const literal = <T extends string>(value: T) => Parser<T>
```

```tsx
/**
 * Tagged template literal for parsing.
 *
 * "template`# ${line}`" will parse "# Heading" to ["Heading"]
 *
 * Can use multiple parsers together. Keep in mind parsers run greedily,
 * so "template`${word}content`" will fail on "textcontent" b/c the `word` parser
 * will match "textcontent", and then it will try to match the literal "content"
 */
export const template
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
 * NOTE: This consumes no tokens.
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
 * Keep consuming until the given parser succeeds.
 * Returns all the characters that were consumed before the parser succeded.
 *
 * @example
 * `takeUntilAfter(char("\n"))` takes until after the newline but
 * doesn't include the newline itself in the result
 */
const takeUntilAfter: <T>(parser: Parser<T>) => Parser<string>
/**
 * Keep consuming until before the given parser succeeds.
 * Returns all the characters that were consumed before the parser succeded.
 *
 * @example
 * `takeUpTo(char("\n"))` takes all chars until before the newline
 */
export const takeUpTo: <T>(parser: Parser<T>): Parser<string>
```

## Built-in primitive parsers

```tsx
/**
 * Takes the first sentence in the stream
 * i.e. up to (and including) the first newline
 */
const line = takeUntilAfter(char("\n"));

/** Matches a single lowercase English letter */
const lower: Parser<string>

/** Matches a single uppercase English letter */
const upper: Parser<string>

/** Matches a single English letter, case insensitive */
const letter: Parser<string>

/**
 * Match an English word
 */
const word: Parser<string>

/** Match a single digit from 0 to 9 */
const digit: Parser<string>

const integer: Parser<number>

/** Match a single hexadecimal digit (0-9, A-F), case insensitive */
const hexDigit: Parser<string>

/** Match a single English letter or digit */
const alphaNumeric: Parser<string>
```

## Examples

TODO to build out more example parsers. However, you can see an example of a bigger parser I use for my custom blog post format here: [https://github.com/tanishqkancharla/tk-parser/blob/main/src/index.ts](https://github.com/tanishqkancharla/tk-parser/blob/main/src/index.ts)

## Testing parsers

Teg ships utilities to test parsers at `teg-parser/testParser`. It is used like this:

```tsx
import { testParser } from "teg-parser/testParser";

const test = testParser(parser)

/** Assert the content passed in completely parses to the expected value */
test.parses(content, expected)

/**
 * Assert the content gets parsed to the expected value, but without asserting
 * all the content is consumed
 */
test.parsePartial(content, expected)

/** Assert the parser successfully matches the given content */
test.matches(content)

/** Assert the parser fails on the given content */
test.fails(content)
```

## ESM and CJS

`teg` comes with out of the box support for both ESM and CJS. The correct format will be used depending on whether you use `import` (ESM) or `require` (CJS). However, a lot of parsers in teg are just simple utilities, so if you use ESM, you will be probably be able to tree-shake away a significant portion of the library.

## Name

(**T**iny or **T**yped)  Parser **E**xpression **G**rammer

## Author

[Tanishq Kancharla](https://tanishqkancharla.dev)

Please make an issue on Github or email/dm me if you have feedback or suggestions!

[Github](https://github.com/tanishqkancharla/teg)
