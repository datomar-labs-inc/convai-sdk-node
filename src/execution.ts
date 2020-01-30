import {ContextModifier, Error} from "./context-modifier";
import {Response} from "./response";

export interface Execution {
    id: string;
    userId: string;
    channelUserId: string;
    sessionId: string;
    environmentId: string;
    blueprintId: string;
    data?: any;
    userData?: any;
    sessionData?: any;
    text: string;
    channel: string;
    source?: any;
    isStart: boolean;
    isTrigger: boolean;
    errors?: Error[];
    response?: Response;
    logs: ExecutionLog[];
    executionDuration: number;
    startTime: Date;
}

export interface ExecutionLog {
    gid: number;
    nid?: number;
    lid?: number;
    ety: number;
    eti: number;
    cmo?: ContextModifier;
}

export interface ExecutionQueryResult {
    executions: Execution[];
    total: number;
}