import {Context} from "./context";

export class ContextModifier {
    
    public changes: ContextChange[];
    public logs: LogEntry[];
    public errors: Error[];

    /**
     * Initialize the class
     */
    constructor() {
        this.changes = [];
        this.logs = [];
        this.errors = [];
    }

    /**
     * Add an operation for the Convai application
     * 
     * @param type - The context modifier type
     * @param op - The type of operation
     * @param key - The key for the value
     * @param data - Value
     * 
     * @returns The current context modifier instance
     */
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

    /**
     * Add a key-value pair in the session scope
     * 
     * @param key - The key for the value
     * @param data - The value to be added
     * 
     * @returns The current context modifier instance with the newly added session key-value pair
     */
    public setSession(key: string, data: any): ContextModifier {
        return this.addOperation(CMType.SESSION, CMOperation.SET, key, data);
    }

    /**
     * Add a key-value pair in the context/execution scope
     * 
     * @param key - The key for the value
     * @param data - The value to be added
     * 
     * @returns The current context modifier instance with the newly added context key-value pair
     */
    public set(key: string, data: any): ContextModifier {
        return this.addOperation(CMType.CONTEXT, CMOperation.SET, key, data);
    }

    /**
     * Add a key-value pair in the user scope
     * 
     * @param key - The key for the value
     * @param data - The value to be added
     * 
     * @returns The current context modifier instance with the newly added user key-value pair
     */
    public setUser(key: string, data: any): ContextModifier {
        return this.addOperation(CMType.USER, CMOperation.SET, key, data);
    }

    /**
     * Add a key-value pair in the environment scope
     * 
     * @param key - The key for the value
     * @param data - The value to be added
     * 
     * @returns The current context modifier instance with the newly added environment key-value pair
     */
    public setEnvironment(key: string, data: any): ContextModifier {
        return this.addOperation(CMType.ENVIRONMENT, CMOperation.SET, key, data);
    }

    /**
     * Delete a key-value pair in the session scope
     * 
     * @param key - The key for the value
     * 
     * @returns The current context modifier instance with the deleted key-value pair
     */
    public deleteSession(key: string): ContextModifier {
        return this.addOperation(CMType.SESSION, CMOperation.DELETE, key, null);
    }

    /**
     * Delete a key-value pair in the context/execution scope
     * 
     * @param key - The key for the value
     * 
     * @returns The current context modifier instance with the deleted key-value pair
     */
    public delete(key: string): ContextModifier {
        return this.addOperation(CMType.CONTEXT, CMOperation.DELETE, key, null);
    }

    /**
     * Delete a key-value pair in the user scope
     * 
     * @param key - The key for the value
     * 
     * @returns The current context modifier instance with the deleted key-value pair
     */
    public deleteUser(key: string): ContextModifier {
        return this.addOperation(CMType.USER, CMOperation.DELETE, key, null);
    }

    /**
     * Delete a key-value pair in the environment scope
     * 
     * @param key - The key for the value
     * 
     * @returns The current context modifier instance with the deleted key-value pair
     */
    public deleteEnvironment(key: string): ContextModifier {
        return this.addOperation(CMType.ENVIRONMENT, CMOperation.DELETE, key, null);
    }

    /**
     * Clear all the key-value pairs in the context/execution scope
     * 
     * @returns The current context modifier instance with the cleared key-value pairs
     */
    public clear(): ContextModifier {
        return this.addOperation(CMType.CONTEXT, CMOperation.CLEAR, "", null);
    }

    /**
     * Clear all the key-value pairs in the session scope'
     * 
     * @returns The current context modifier instance with the cleared key-value pairs 
     */
    public clearSession(): ContextModifier {
        return this.addOperation(CMType.SESSION, CMOperation.CLEAR, "", null);
    }

    /**
     * Clear all the key-value pairs in the user scope
     *
     * @returns The current context modifier instance with the cleared key-value pairs  
     */
    public clearUser(): ContextModifier {
        return this.addOperation(CMType.USER, CMOperation.CLEAR, "", null);
    }

    /**
     * Clear all the key-value pairs in the environment scope
     * 
     * @returns The current context modifier instance with the cleared key-value pairs 
     */
    public clearEnvironment(): ContextModifier {
        return this.addOperation(CMType.ENVIRONMENT, CMOperation.CLEAR, "", null);
    }

    /**
     * Add a log message be sent with the API request
     * 
     * @param level - Log level for proper coloring
     * @param message - Log message
     * 
     * @returns The current context modifier instance
     */
    public log(level: number, message: string): ContextModifier {
        this.logs.push({
            level,
            message,
            time: new Date(),
        });

        return this;
    }

    /**
     * Add a trace level log
     * 
     * @param message - Message for the log
     * 
     * @returns The current context modifier instance with the added log 
     */
    public logTrace(message: string): ContextModifier {
        return this.log(LogLevel.TRACE, message);
    }

    /**
     * Add a debug level log
     * 
     * @param message - Message for the log
     * 
     * @returns The current context modifier instance with the added log 
     */
    public logDebug(message: string): ContextModifier {
        return this.log(LogLevel.DEBUG, message);
    }

    /**
     * Add a info level log
     * 
     * @param message - Message for the log
     * 
     * @returns The current context modifier instance with the added log 
     */
    public logInfo(message: string): ContextModifier {
        return this.log(LogLevel.INFO, message);
    }

    /**
     * Add a warning level log
     * 
     * @param message - Message for the log
     * 
     * @returns The current context modifier instance with the added log 
     */
    public logWarning(message: string): ContextModifier {
        return this.log(LogLevel.WARNING, message);
    }

    /**
     * Add a error level log
     * 
     * @param message - Message for the log
     * 
     * @returns The current context modifier instance with the added log 
     */
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