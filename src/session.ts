import {Flaggable} from "./flaggable";

export class Session extends Flaggable {
    public ver: string;
    private stack: Stack;

    constructor() {
        super();

        this.ver = "";
        this.stack = {frames: []};
    }
}

export interface Stack {
    frames: Frame[];
}

export interface Frame {
    m: number; // Module
    n: number; // Node
}