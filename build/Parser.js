"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const ParseResult_1 = require("./ParseResult");
const ParserStream_1 = require("./ParserStream");
class Parser {
    parseFn;
    constructor(parseFn) {
        this.parseFn = parseFn;
    }
    run(stream) {
        const parserStream = stream instanceof ParserStream_1.ParserStream ? stream : new ParserStream_1.ParserStream(stream);
        try {
            return this.parseFn(parserStream);
        }
        catch (e) {
            return new ParseResult_1.ParseFailure(`Unexpected parse failure: ${e}`, parserStream);
        }
    }
    map(fn) {
        return new Parser((stream) => this.parseFn(stream).map(fn));
    }
    bimap(successFn, failFn) {
        return new Parser((stream) => this.parseFn(stream).bimap(successFn, failFn));
    }
    /** Combine parsers together in sequence */
    chain(fn) {
        return new Parser((stream) => this.parseFn(stream).chain((val, stream) => fn(val).run(stream)));
    }
    fold(successFn, failFn) {
        return new Parser((stream) => this.parseFn(stream).fold(successFn, failFn));
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map