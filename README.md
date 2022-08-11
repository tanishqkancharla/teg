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

## Docs

TODO

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
