import {Session} from "./session";

export class UserQueryBuilder {
    private mode: UserQueryMode;
    private checks: QueryCheck[];
    private currentCheck?: QueryCheck;
    private limit: number;
    private offset: number;

    public static all(): UserQueryBuilder {
        return new UserQueryBuilder(UserQueryMode.ALL);
    }

    public static any(): UserQueryBuilder {
        return new UserQueryBuilder(UserQueryMode.ANY);
    }

    public static none(): UserQueryBuilder {
        return new UserQueryBuilder(UserQueryMode.NONE);
    }

    constructor(mode: UserQueryMode) {
        this.mode = mode;
        this.checks = [];
        this.limit = 10;
        this.offset = 0;
    }

    public where(field: string): UserQueryBuilder {
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

    public equals(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call equals without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.EQUALS;
        this.currentCheck.values = values;

        return this;
    }

    public notEquals(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call notEquals without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.NOT_EQUALS;
        this.currentCheck.values = values;

        return this;
    }

    public startsWith(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call startsWith without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.STARTS_WITH;
        this.currentCheck.values = values;

        return this;
    }

    public greaterThan(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call notEquals without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.NOT_EQUALS;
        this.currentCheck.values = values;

        return this;
    }

    public lessThan(...values: string[]): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call lessThan without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.LESS_THAN;
        this.currentCheck.values = values;

        return this;
    }


    public exists(): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call exists without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.EXISTS;

        return this;
    }

    public notExists(): UserQueryBuilder {
        if (!this.currentCheck) {
            throw new Error("cannot call notExists without calling where first");
        }

        this.currentCheck.operation = UserQueryOperation.NOT_EXISTS;

        return this;
    }

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
    superUserIds: string[]
}