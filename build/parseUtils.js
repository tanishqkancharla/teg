"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.line = exports.takeUntilAfter = exports.not = exports.suffix = exports.prefix = exports.between = exports.concat = exports.str = exports.maybe = exports.lookahead = exports.sequence = exports.oneOf = exports.oneOrMore = exports.zeroOrMore = exports.nOrMore = exports.notChars = exports.char = exports.logResult = exports.logStream = exports.isParseFailure = exports.isParseSuccess = exports.identity = void 0;
const Parser_1 = require("./Parser");
const ParseResult_1 = require("./ParseResult");
const identity = (arg) => arg;
exports.identity = identity;
function isParseSuccess(result) {
    return result instanceof ParseResult_1.ParseSuccess;
}
exports.isParseSuccess = isParseSuccess;
function isParseFailure(result) {
    return result instanceof ParseResult_1.ParseFailure;
}
exports.isParseFailure = isParseFailure;
function logStream(stream) {
    const { content, marker } = stream.log();
    return `
|
| ${content}
| ${marker}`;
}
exports.logStream = logStream;
function logResult(result) {
    if (isParseFailure(result)) {
        return `
Parse Failure
${logStream(result.stream)}
Failed at index ${result.stream.index}: ${result.value}
`;
    }
    else {
        return `
Parse Success
"${result.stream.content}" ==> ${JSON.stringify(result.value, undefined, "  ")}
`;
    }
}
exports.logResult = logResult;
const char = (c) => new Parser_1.Parser((stream) => {
    if (c.length !== 1) {
        throw new Error(`char invoked with non-char object "${c}"`);
    }
    const value = stream.head();
    if (value === c) {
        return new ParseResult_1.ParseSuccess(value, stream.move(1));
    }
    return new ParseResult_1.ParseFailure(`Char did not match ${JSON.stringify(c)}`, stream);
});
exports.char = char;
const notChars = (chars) => (0, exports.not)((0, exports.oneOf)(chars.map((charV) => (0, exports.char)(charV))));
exports.notChars = notChars;
const nOrMore = (n, parser) => new Parser_1.Parser((stream) => {
    const values = [];
    let errVal;
    while (true || stream.isEmpty) {
        let result = parser.run(stream);
        if (isParseSuccess(result)) {
            values.push(result.value);
            stream = result.stream;
        }
        else {
            errVal = result.value;
            break;
        }
    }
    if (values.length < n) {
        return new ParseResult_1.ParseFailure(`nOrMore failed: only matched ${values.length} tokens
${errVal}`, stream);
    }
    return new ParseResult_1.ParseSuccess(values, stream);
});
exports.nOrMore = nOrMore;
const zeroOrMore = (parser) => (0, exports.nOrMore)(0, parser);
exports.zeroOrMore = zeroOrMore;
const oneOrMore = (parser) => (0, exports.nOrMore)(1, parser);
exports.oneOrMore = oneOrMore;
const oneOf = (parsers) => new Parser_1.Parser((stream) => {
    for (const parser of parsers) {
        const result = parser.run(stream);
        if (result instanceof ParseResult_1.ParseSuccess) {
            return result;
        }
    }
    return new ParseResult_1.ParseFailure("oneOf failed", stream);
});
exports.oneOf = oneOf;
function sequence(parsers, delimiter) {
    return new Parser_1.Parser((stream) => {
        // type SeqParserTokenArray = ParserTokenArray<ParserArray>;
        // type SeqParserToken = SeqParserTokenArray[keyof SeqParserTokenArray];
        const seqValues = [];
        for (const parser of parsers) {
            const result = parser.run(stream);
            if (result instanceof ParseResult_1.ParseSuccess) {
                const { value, stream: newStream } = result;
                seqValues.push(value);
                stream = newStream;
                const notAtEnd = seqValues.length < parsers.length;
                if (delimiter && notAtEnd) {
                    const { stream: afterDelimStream } = delimiter.run(newStream);
                    if (result instanceof ParseResult_1.ParseSuccess) {
                        stream = afterDelimStream;
                    }
                    else {
                        return result;
                    }
                }
            }
            else {
                return result;
            }
        }
        return new ParseResult_1.ParseSuccess(seqValues, stream);
    });
}
exports.sequence = sequence;
const lookahead = (parser) => new Parser_1.Parser((stream) => {
    const result = parser.run(stream);
    if (isParseFailure(result)) {
        return new ParseResult_1.ParseFailure(result.value, stream);
    }
    else {
        return new ParseResult_1.ParseSuccess(result.value, stream);
    }
});
exports.lookahead = lookahead;
const maybe = (parser) => new Parser_1.Parser((stream) => {
    const result = parser.run(stream);
    if (isParseFailure(result)) {
        return new ParseResult_1.ParseSuccess(undefined, stream);
    }
    else {
        return new ParseResult_1.ParseSuccess(result.value, result.stream);
    }
});
exports.maybe = maybe;
const str = (str) => sequence(str.split("").map(exports.char)).map(exports.concat);
exports.str = str;
const concat = (strs) => strs.join("");
exports.concat = concat;
const between = (left, parser, right) => sequence([left, parser, right]).map((v) => v[1]);
exports.between = between;
const prefix = (prefix, parser) => sequence([prefix, parser]).map((v) => v[1]);
exports.prefix = prefix;
const suffix = (parser, suffix) => sequence([parser, suffix]).map((v) => v[0]);
exports.suffix = suffix;
const not = (parser) => new Parser_1.Parser((stream) => {
    if (stream.isEmpty) {
        return new ParseResult_1.ParseFailure("stream was emptied", stream);
    }
    const result = parser.run(stream);
    if (isParseFailure(result)) {
        return new ParseResult_1.ParseSuccess(stream.head(), stream.move(1));
    }
    else {
        return new ParseResult_1.ParseFailure("not failed", result.stream);
    }
});
exports.not = not;
const takeUntilAfter = (parser) => (0, exports.suffix)((0, exports.zeroOrMore)((0, exports.not)(parser)), parser).map(exports.concat);
exports.takeUntilAfter = takeUntilAfter;
exports.line = (0, exports.takeUntilAfter)((0, exports.char)("\n"));
//# sourceMappingURL=parseUtils.js.map