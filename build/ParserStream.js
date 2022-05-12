"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserStream = void 0;
class ParserStream {
    content;
    index;
    length;
    get isEmpty() {
        return this.length === 0;
    }
    constructor(content, index, length) {
        this.content = content;
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
    move(distance) {
        return new ParserStream(this.content, this.index + distance, this.length - distance);
    }
    // Same interface as Array.slice but returns a new Stream
    slice(start, stop) {
        if (stop < start) {
            throw new Error("stop < start");
        }
        if (stop && stop > this.length) {
            throw new TypeError("index out of range");
        }
        return new ParserStream(this.content, this.index + start, (stop || this.length) - start);
    }
    log() {
        const marker = " ".repeat(this.index) + "^";
        return { content: this.content.replace(/\n/g, "\\n"), marker };
    }
    get rest() {
        return this.content.slice(this.index);
    }
}
exports.ParserStream = ParserStream;
//# sourceMappingURL=ParserStream.js.map