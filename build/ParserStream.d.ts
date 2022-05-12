export declare class ParserStream {
    content: string;
    index: number;
    private length;
    get isEmpty(): boolean;
    constructor(content: string, index?: number, length?: number);
    head(): string;
    move(distance: number): ParserStream;
    slice(start: number, stop: number): ParserStream;
    log(): {
        content: string;
        marker: string;
    };
    get rest(): string;
}
