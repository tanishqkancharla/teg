import * as teg from "teg-parser"

const concat = (strs: string[]) => strs.join("")

function takeFirst<T>(values: [T, ...any[]]): T {
	return values[0]
}

function takeLast<T>(values: [...any[], T]): T {
	return values[values.length - 1]
}

// Headings

type Heading = {
	type: "heading"
	level: number
	content: string
}

export const heading1: teg.Parser<Heading> = teg.template`# ${teg.line}`.map(
	([content]) => {
		return { type: "heading", level: 1, content }
	}
)
export const heading2: teg.Parser<Heading> = teg.template`## ${teg.line}`.map(
	([content]) => {
		return { type: "heading", level: 2, content }
	}
)
export const heading3: teg.Parser<Heading> = teg.template`### ${teg.line}`.map(
	([content]) => {
		return { type: "heading", level: 3, content }
	}
)

// Paragraph

type Paragraph = {
	type: "paragraph"
	content: string
}

export const paragraph: teg.Parser<Paragraph> = teg.line.map((content) => ({
	type: "paragraph",
	content,
}))

type Image = {
	type: "image"
	src: string
	alt: string
}

const imageAlt = teg
	.oneOrMore(teg.oneOf([teg.word, teg.literal(" ")]))
	.map(concat)

const imageSrc = teg
	.oneOrMore(
		teg.oneOf([teg.word, teg.literal("/"), teg.literal(":"), teg.literal(".")])
	)
	.map(concat)

export const image: teg.Parser<Image> =
	teg.template`![${imageAlt}](${imageSrc})\n`.map(([alt, src]) => {
		return { type: "image", alt, src }
	})

type Divider = {
	type: "divider"
}

export const divider: teg.Parser<Divider> = teg
	.literal("---\n")
	.map(() => ({ type: "divider" }))

type Block = Heading | Paragraph | Image | Divider

export const block: teg.Parser<Block> = teg.oneOf([
	heading1,
	heading2,
	heading3,
	paragraph,
	image,
	divider,
])

export const document = teg.oneOrMore(block)
