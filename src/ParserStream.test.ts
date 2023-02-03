import { ParserStream } from "./ParserStream"
import { outdent } from "./parseUtils"

describe("ParserStream printing", () => {
	it("Works", () => {
		// Hello,
		// 0    5
		// This is
		//     10
		const stream = new ParserStream(
			outdent(`
        Hello,
        This is
        a stream
      `),
			10
		)

		expect(stream.toString()).toBe(
			outdent(`
        | Hello,
        | This is
        |     ^
        | a stream
      `)
		)
	})

	it("Truncates stream at beginning for > 3 rows", () => {
		// Hello,
		// 0    5
		// This is
		//     10
		// a
		// very
		//  15
		// very
		//   20
		// very
		//    25
		const stream = new ParserStream(
			outdent(`
        Hello,
        This is
        a
        very
        very
        very
        very
        long stream
      `),
			25
		)

		expect(stream.toString()).toBe(
			outdent(`
        | ...
        | very
        | very
        |    ^
        | very
        | long stream
      `)
		)
	})

	it("Truncates stream at end for > 3 rows", () => {
		// Hello,
		// 0    5
		// This is
		//     10
		// a
		// very
		//  15
		// very
		//   20
		// very
		//    25
		// very
		// long stream
		// 30   35   40
		const stream = new ParserStream(
			outdent(`
        Hello,
        This is
        a
        very
        very
        very
        very
        long stream
      `),
			10
		)

		expect(stream.toString()).toBe(
			outdent(`
        | Hello,
        | This is
        |     ^
        | a
        | very
        | ...
      `)
		)
	})
})
