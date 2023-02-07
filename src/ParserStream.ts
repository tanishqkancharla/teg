function find2DIndex(contentLines: string[], linearIndex: number) {
	let row = 0
	let previousLength = 0
	let currentLength = contentLines[0].length

	while (currentLength < linearIndex) {
		previousLength += contentLines[row].length
		currentLength += contentLines[row + 1].length
		row++
	}

	const col = linearIndex - previousLength

	return [row, col]
}

function printBeginningOfStream(contentLines: string[], row: number) {
	if (row <= 3) {
		const contentRows = contentLines
			.slice(0, row + 1)
			.map((line) => `| ${line}`)
		return contentRows.join("\n") + "\n"
	} else {
		const contentRows = contentLines
			.slice(row - 1, row + 1)
			.map((line) => `| ${line}`)
		return "| ...\n" + contentRows.join("\n") + "\n"
	}
}

function printEndOfStream(contentLines: string[], row: number) {
	const numRows = contentLines.length

	if (numRows - row <= 3) {
		const contentRows = contentLines.slice(row + 1).map((line) => `| ${line}`)
		if (contentRows.length === 0) return ""
		return "\n" + contentRows.join("\n")
	} else {
		const contentRows = contentLines
			.slice(row + 1, row + 3)
			.map((line) => `| ${line}`)

		return contentRows.join("\n") + "\n| ..."
	}
}

export class ParserStream {
	constructor(
		public content: string,
		public index: number = 0,
		private length: number = content.length - index
	) {}

	isEmpty = () => {
		return this.length === 0
	}

	// Get the first value from the iterable.
	head = (amount = 1) => {
		if (this.isEmpty()) {
			throw new TypeError("Stream was emptied")
		}
		return this.content[this.index]
	}

	// Consume the stream by moving the cursor.
	move(distance: number) {
		return new ParserStream(
			this.content,
			this.index + distance,
			this.length - distance
		)
	}

	toString() {
		const contentLines = this.content.split("\n")
		const [row, col] = find2DIndex(contentLines, this.index)
		const marker = `| ${" ".repeat(col)}^`

		return (
			printBeginningOfStream(contentLines, row) +
			marker +
			printEndOfStream(contentLines, row)
		)
	}
}
