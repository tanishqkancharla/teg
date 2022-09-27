export class ParserStream {
	constructor(public content: string, public index: number = 0) {}

	isEmpty = () => {
		return this.content.length === this.index;
	};

	// Get the first value from the iterable.
	head = (amount = 1) => {
		if (this.isEmpty()) {
			throw new TypeError("Stream is empty");
		} else if (amount + this.index > this.content.length) {
			throw new TypeError(
				`Cannot access ${amount} characters: stream only has ${
					this.content.length - this.index
				} characters left`
			);
		}
		return this.content.slice(this.index, this.index + amount);
	};

	// Consume the stream by moving the cursor.
	move = (distance: number) => {
		if (this.isEmpty()) {
			throw new TypeError("Stream is empty");
		} else if (distance + this.index > this.content.length) {
			throw new TypeError(
				`Cannot move ${distance} characters: stream only has ${
					this.content.length - this.index
				} characters left`
			);
		}

		return new ParserStream(this.content, this.index + distance);
	};

	toString = () => {
		const marker = " ".repeat(this.index) + "^";
		const content = this.content.replace(/\n/g, "\\n");

		return `|
| ${content}
| ${marker}`;
	};
}
