import { outdent, testParser } from "teg-parser/testParser"
import {
	divider,
	heading1,
	heading2,
	heading3,
	image,
	paragraph,
} from "./simple-markdown"

describe("Headings", () => {
	const testHeading1 = testParser(heading1)
	const testHeading2 = testParser(heading2)
	const testHeading3 = testParser(heading3)

	it("Works", () => {
		testHeading1.parses(
			outdent(`
        # Heading 1
      `),
			{
				type: "heading",
				level: 1,
				content: "Heading 1",
			}
		)
		testHeading2.parses(
			outdent(`
        ## Heading 2
      `),
			{
				type: "heading",
				level: 2,
				content: "Heading 2",
			}
		)
		testHeading3.parses(
			outdent(`
        ### Heading 3
      `),
			{
				type: "heading",
				level: 3,
				content: "Heading 3",
			}
		)
	})
})

describe("Paragraph", () => {
	const testParagraph = testParser(paragraph)

	it("Works", () => {
		testParagraph.parses(
			outdent(`
        Paragraph content
      `),
			{ type: "paragraph", content: "Paragraph content" }
		)
	})
})

describe("Image", () => {
	const testImage = testParser(image)

	it("Works", () => {
		testImage.parses(`![A random unsplash link](https://unsplash.com/)\n`, {
			type: "image",
			alt: "A random unsplash link",
			src: "https://unsplash.com/",
		})
	})
})

describe("Divider", () => {
	const testDivider = testParser(divider)

	it("Works", () => {
		testDivider.parses(`---\n`, {
			type: "divider",
		})
	})
})
