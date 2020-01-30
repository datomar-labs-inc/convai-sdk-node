import {ContextModifier} from "./context-modifier";

export interface TriggerRequest {
    contextModifier?: ContextModifier;
    channelId: string;
    text: string;
    isStart: boolean;
    isTrigger: boolean;
    source?: any;
}