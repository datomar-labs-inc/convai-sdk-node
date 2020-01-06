import {Context} from "./context";

export class ContextModifier {
    public changes: ContextChange[];
    public logs: LogEntry[];
    public errors: Error[];

    constructor() {
        this.changes = [];
        this.logs = [];
        this.errors = [];
    }

    private addOperation(type: number, op: number, key: string, data: any): ContextModifier {
        this.changes.push({
            type,
            op,
            key,
            data,
        });

        return this;
    }

    public apply(ctx: Context) {
        // TODO implement
    }

    public error(err: Error): ContextModifier {
        this.errors.push(err);
        return this;
    }

    public setSession(key: string, data: any): ContextModifier {
        return this.addOperation(CMType.SESSION, CMOperation.SET, key, data);
    }

    public set(key: string, data: any): ContextModifier {
        return this.addOperation(CMType.CONTEXT, CMOperation.SET, key, data);
    }

    public setUser(key: string, data: any): ContextModifier {
        return this.addOperation(CMType.USER, CMOperation.SET, key, data);
    }

    public setEnvironment(key: string, data: any): ContextModifier {
        return this.addOperation(CMType.ENVIRONMENT, CMOperation.SET, key, data);
    }

    public deleteSession(key: string): ContextModifier {
        return this.addOperation(CMType.SESSION, CMOperation.DELETE, key, null);
    }

    public delete(key: string): ContextModifier {
        return this.addOperation(CMType.CONTEXT, CMOperation.DELETE, key, null);
    }

    public deleteUser(key: string): ContextModifier {
        return this.addOperation(CMType.USER, CMOperation.DELETE, key, null);
    }

    public deleteEnvironment(key: string): ContextModifier {
        return this.addOperation(CMType.ENVIRONMENT, CMOperation.DELETE, key, null);
    }

    public clear(): ContextModifier {
        return this.addOperation(CMType.CONTEXT, CMOperation.CLEAR, "", null);
    }

    public clearSession(): ContextModifier {
        return this.addOperation(CMType.SESSION, CMOperation.CLEAR, "", null);
    }

    public clearUser(): ContextModifier {
        return this.addOperation(CMType.USER, CMOperation.CLEAR, "", null);
    }

    public clearEnvironment(): ContextModifier {
        return this.addOperation(CMType.ENVIRONMENT, CMOperation.CLEAR, "", null);
    }

    public log(level: number, message: string): ContextModifier {
        this.logs.push({
            level,
            message,
            time: new Date(),
        });

        return this;
    }

    public logTrace(message: string): ContextModifier {
        return this.log(LogLevel.TRACE, message);
    }

    public logDebug(message: string): ContextModifier {
        return this.log(LogLevel.DEBUG, message);
    }

    public logInfo(message: string): ContextModifier {
        return this.log(LogLevel.INFO, message);
    }

    public logWarning(message: string): ContextModifier {
        return this.log(LogLevel.WARNING, message);
    }

    public logError(message: string): ContextModifier {
        return this.log(LogLevel.ERROR, message);
    }
}

export interface ContextChange {
    type: CMType,
    op: CMOperation,
    key: string,
    data: any
}

export interface LogEntry {
    level: LogLevel,
    message: string,
    time: Date,
}

export interface Error {
    et: 'node' | 'link' | 'other',
    graphId: number,
    graphName: string,
    nodeId?: number,
    linkSource?: number,
    linkDest?: number,
    message: string,
}

enum CMType {
    CONTEXT, SESSION, USER, ENVIRONMENT
}

enum CMOperation {
    SET, DELETE, CLEAR
}

enum LogLevel {
    TRACE, DEBUG = 5, INFO = 10, WARNING = 15, ERROR = 20
}