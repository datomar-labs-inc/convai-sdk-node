import {Session} from "./session";

// Create a channel user
export interface CreateChannelUser {
    channel: string,
    channel_id: string,
    session: Session,
}

// Request to add a super user and associated channel users
export interface CreateCombinedUserRequest {
    environment_id: string,
    user_data: any,
    channel_users: CreateChannelUser[]
}

// Request to add a channel user to an existing super user
export interface CreateChannelUsersRequest {
    environment_id: string,
    super_user_id: string,
    channel_users: CreateChannelUser[]
}

export interface CreateCombinedUserResult {
    // The Super User ID
    id: string,
    // The channel user IDs
    users: string[]
}

export interface CreateChannelUsersResult {
    // The Channel User IDs
    ids: string[]
}