"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseFailure = exports.ParseSuccess = void 0;
class ParseSuccess {
    value;
    stream;
    constructor(value, stream) {
        this.value = value;
        this.stream = stream;
    }
    map(fn) {
        return new ParseSuccess(fn(this.value), this.stream);
    }
    bimap(successFn, failFn) {
        return new ParseSuccess(successFn(this.value), this.stream);
    }
    chain(fn) {
        return fn(this.value, this.stream);
    }
    fold(successFn, failFn) {
        return successFn(this);
    }
}
exports.ParseSuccess = ParseSuccess;
class ParseFailure {
    value;
    stream;
    constructor(value, stream) {
        this.value = value;
        this.stream = stream;
    }
    map(fn) {
        return this;
    }
    bimap(successFn, failFn) {
        return new ParseFailure(failFn(this.value), this.stream);
    }
    chain(fn) {
        return this;
    }
    fold(successFn, failFn) {
        return failFn(this);
    }
}
exports.ParseFailure = ParseFailure;
//# sourceMappingURL=ParseResult.js.map