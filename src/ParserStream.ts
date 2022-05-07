export class ParserStream {
	index: number;
	private length: number;

	get isEmpty() {
		return this.length === 0;
	}

	constructor(public content: string, index?: number, length?: number) {
		this.index = index === undefined ? 0 : index;
		this.length = length === undefined ? content.length : length;
	}

	// Get the first value from the iterable.
	head() {
		if (this.isEmpty) {
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
	// Same interface as Array.slice but returns a new Stream
	slice(start: number, stop: number) {
		if (stop < start) {
			throw new Error("stop < start");
		}
		if (stop && stop > this.length) {
			throw new TypeError("index out of range");
		}
		return new ParserStream(
			this.content,
			this.index + start,
			(stop || this.length) - start
		);
	}

	log() {
		const marker = " ".repeat(this.index) + "^";
		return { content: this.content.replace(/\n/g, "\\n"), marker };
	}

	get rest() {
		return this.content.slice(this.index);
	}
}
