export class ParserStream {
	constructor(
		public content: string,
		public index: number = 0,
		private length: number = content.length
	) {}

	isEmpty = () => {
		return this.length === 0;
	};

	// Get the first value from the iterable.
	head() {
		if (this.isEmpty()) {
			throw new TypeError("Stream was emptied");
		}
		return this.content[this.index];
	}

	// Consume the stream by moving the cursor.
	move(distance: number) {
		return new ParserStream(
			this.content,
			this.index + distance,
			this.length - distance
		);
	}

	toString() {
		const marker = " ".repeat(this.index) + "^";
		const content = this.content.replace(/\n/g, "\\n");

		return `|
| ${content}
| ${marker}`;
	}
}
