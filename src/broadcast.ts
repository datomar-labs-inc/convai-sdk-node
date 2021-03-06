import {ContextModifier} from "./context-modifier";
import {UserQuery} from "./user-query";

export interface BroadcastInput {
    broadcastType: string,
    contextModifier?: ContextModifier,
    channel: string,
    userQuery: UserQuery,
}

export interface BroadcastResult {
    status: string,
    users: number,
}