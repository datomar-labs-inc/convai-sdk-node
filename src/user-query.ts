import {Session} from "./session";

export class UserQueryBuilder {
    private mode: UserQueryMode;
    private checks: QueryCheck[];
    private currentCheck?: QueryCheck;
    private limit: number;
    private offset: number;

    /**
     * Initialize the Query Builder to use the All mode. All the conditions must be true for the users.
     */
    public static all(): UserQueryBuilder {
        return new UserQueryBuilder(UserQueryMode.ALL);
    }

    /**
     * Initialize the Query Builder to use the Any mode. Atleast one condition should be true for the users.
     */
    public static any(): UserQueryBuilder {
        return new UserQueryBuilder(UserQueryMode.ANY);
    }

    /**
     * Initialize the Query Builder to use the Any mode. None of the condition should be true for the users.
     */
    public static none(): UserQueryBuilder {
        return new UserQueryBuilder(UserQueryMode.NONE);
    }

    /**
     * Initialize the class
     * 
     * @param mode Query Mode to use for the builder. Can be ANY | ALL | NONE
     */
    constructor(mode: UserQueryMode) {
        this.mode = mode;
        this.checks = [];
        this.limit = 10;
        this.offset = 0;
    }

    /**
     * Intialize a query to be performed. This method handles the 'key' part of the query
     * 
     * @param field Name of the key
     */
    public where(field: string): UserQueryBuilder {

        // Check if a query is already in place. If yes, add it to the checks variable
        if (this.currentCheck) {
            this.checks.push(this.currentCheck);
        }

        this.currentCheck = {
            field,
            operation: UserQueryOperation.EQUALS,
            values: [],
        };

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the return set from where 'key' is equal to 'value'
     * 
     * @param values The value to be compared
     */
    public equals(...values: string[]): UserQueryBuilder {

        // Use of this method requires a where() method
        if (!this.currentCheck) {
            throw new Error("cannot call equals without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.EQUALS;
        this.currentCheck.values = values;

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the return set from where 'key' doesn't equal 'value'
     * 
     * @param values The value to be compared
     */
    public notEquals(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call notEquals without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.NOT_EQUALS;
        this.currentCheck.values = values;

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the return set from the where 'key' starts with 'value'
     * 
     * @param values The value to be compared
     */
    public startsWith(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call startsWith without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.STARTS_WITH;
        this.currentCheck.values = values;

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the return set from the where 'key' should be greater than 'value'
     * 
     * @param values The value to be compared
     */
    public greaterThan(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call notEquals without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.NOT_EQUALS;
        this.currentCheck.values = values;

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the return set from the where 'key' should be less than 'value'
     * 
     * @param values The value to be compared
     */
    public lessThan(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call lessThan without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.LESS_THAN;
        this.currentCheck.values = values;

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the user data should have the where 'key'
     */
    public exists(): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call exists without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.EXISTS;

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the user data should not have the where 'key'
     */
    public notExists(): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call notExists without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.NOT_EXISTS;

        return this;
    }

    /**
     * Build different user queries into a single user query
     */
    public build(): UserQuery {
        if (this.currentCheck) {
            this.checks.push(this.currentCheck);
        }

        return {
            mode: this.mode,
            checks: this.checks,
            limit: this.limit,
            offset: this.offset,
        }
    }
}

export interface UserQuery {
    mode: UserQueryMode,
    checks: QueryCheck[],
    limit?: number,
    offset?: number,
}

export interface QueryCheck {
    field: string,
    operation: UserQueryOperation,
    values: string[],
}

export enum UserQueryOperation {
    EQUALS, EXISTS, NOT_EXISTS, NOT_EQUALS, STARTS_WITH, GREATER_THAN, LESS_THAN
}

export enum UserQueryMode {
    ANY, ALL, NONE
}

export interface UserQueryResult {
    users: SuperUser[],
    count: number,
}

export interface SuperUser {
    id: string,
    environmentId: string,
    data: any,
    createdAt: Date,
    updatedAt: Date,
    channelUsers: ChannelUser[],
}

export interface ChannelUser {
    channelId: string,
    environmentId: string,
    channel: string,
    data: any,
    superUserId: string,
    session: Session,
    createdAt: Date,
    updatedAt: Date,
}

export interface UserQueryReachableResult {
    count: number;
}

export interface MergeUsersRequest {
    superUserIds: string[];
    preferNewUserFields: string[];
}