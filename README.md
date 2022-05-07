# Teg

Teg is a tiny parser framework written in Typescript. It aims to be a semantic and approachable library for parsing.

```ts
import { prefix, str, line } from "teg"

/** Parse markdown level 1 headings */
const h1Parser = prefix(str("# "), line);

const result = h1Parser.run("# heading\n");

console.log(result.content) // Prints "heading"
```

Often, you'll want to do some processing on a successful parse. To make this ergonomic, parsers define a `map` function that will let you transform successfully parsed content.

```ts
import {sequence, str, maybe, line, takeUntilAfter } from "teg"

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

assert.ok(result.content === { lang: "ts", content: "const code = runCode();" })

```

Since it's written in typescript, types are inferred as much as possible.

Much of the idea comes from [Chet Corcos's article on parsers](https://medium.com/@chetcorcos/introduction-to-parsers-644d1b5d7f3d). Although `Parser`s currently implement `bimap`, `fold`, and `chain` methods as described in the article, I haven't found them as useful in real-world usage, and may remove them or change them.
