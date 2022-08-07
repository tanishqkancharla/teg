export class ParserStream {
	index: number;
	private length: number;

	isEmpty = () => {
		return this.length === 0;
	};

	constructor(public content: string, index?: number, length?: number) {
		this.index = index === undefined ? 0 : index;
		this.length = length === undefined ? content.length : length;
	}

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

	log() {
		const marker = " ".repeat(this.index) + "^";
		return { content: this.content.replace(/\n/g, "\\n"), marker };
	}
}
