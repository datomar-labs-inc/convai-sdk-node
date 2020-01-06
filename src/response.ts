import {ResponseBlock} from "./response-block";

export interface Response {
    messages: Message[];
}

export interface Message {
    text: string,
    typingTime: number,
    graphId?: number;
    nodeId?: number;
    blocks: ResponseBlock[],
    seq: number,
}