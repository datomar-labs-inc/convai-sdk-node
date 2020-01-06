import {Session} from "./session";

export interface UserQuery {
    mode: UserQueryMode,
    checks: QueryCheck[],
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
}

export interface PlatformUser {
    platformId: string,
    environmentId: string,
    platform: string,
    data: any,
    superUserId: string,
    session: Session,
    createdAt: Date,
    updatedAt: Date,
}