import {ResponseBlock} from "./response-block";

export interface Response {
    messages: Message[];
}

export interface Message {
    text: string;
    typingTime: number;
    graphId?: number;
    nodeId?: number;
    blocks: ResponseBlock[];
    data: XMLResponse;
    seq: number;
}

export interface XMLResponse {
    message: string;
    sender?: XMLSender;
    quickReplies?: XMLQR[];
    phone?: XMLPhone[];
    cards?: XMLCard[];
    cardCollections?: XMLCardCollection[];
    images?: XMLImage[];
}

export interface XMLQR {
    text: string;
    value?: string;
    phone: boolean;
    email: boolean;
    image?: string;
    imageUrl?: string;
}

export interface XMLPhone {
    number: string;
    display?: string;
}

export interface XMLCardCollection {
    cards: XMLCard[];
}

export interface XMLCard {
    title: string;
    subtitle?: string;
    image?: XMLImage;
    buttons?: XMLButton[];
}

export interface XMLImage {
    id: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}

export interface XMLButton {
    text: string;
    value?: string;
    url?: string;
}

export interface XMLSender {
    name: string;
    persona?: string;
}