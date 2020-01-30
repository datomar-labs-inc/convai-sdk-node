import request from 'request-promise-native';
import {
    ChannelUser,
    MergeUsersRequest,
    SuperUser,
    UserQuery,
    UserQueryReachableResult,
    UserQueryResult
} from "./user-query";
import {BroadcastInput, BroadcastResult} from "./broadcast";
import {UpdateUserDataInput} from "./update-user-data";
import {ExecutionMatcher} from "./execution-query";
import {Execution, ExecutionQueryResult} from "./execution";
import {TriggerRequest} from "./trigger";
import {Session} from "./session";

export class ConvaiAPIClient {
    private baseURL: string;
    private apiKey: string;

    constructor(apiKey: string) {
        this.baseURL = "https://api.convai.dev/api/v1";
        this.apiKey = apiKey;
    }

    private makeRequestWithBody<T>(method: string, url: string, body: any): Promise<T> {
        return request(`${this.baseURL}${url}`, {
            method,
            json: body,
            auth: {
                bearer: this.apiKey,
            }
        });
    }

    public queryExecutions(query: ExecutionMatcher): Promise<ExecutionQueryResult> {
        return this.makeRequestWithBody("POST", `/executions/query`, query);
    }

    public trigger(req: TriggerRequest): Promise<Execution> {
        return this.makeRequestWithBody("POST", `/executions/trigger`, req);
    }

    public broadcast(input: BroadcastInput): Promise<BroadcastResult> {
        return this.makeRequestWithBody("POST", "/executions/broadcast", input);
    }

    public queryUsers(query: UserQuery): Promise<UserQueryResult> {
        return this.makeRequestWithBody("POST", `/users/super/query`, query);
    }

    public queryUsersReachable(query: UserQuery): Promise<UserQueryReachableResult> {
        return this.makeRequestWithBody("POST", "/users/super/query/reachable", query);
    }

    public mergeUsers(req: MergeUsersRequest): Promise<SuperUser> {
        return this.makeRequestWithBody("POST", "/users/super/merge", req);
    }

    public deleteSuperUser(id: string): Promise<SuperUser> {
        return this.makeRequestWithBody("DELETE", `/users/super/${id}`, null);
    }

    public updateUserData(superUserId: string, input: UpdateUserDataInput): Promise<SuperUser> {
        return this.makeRequestWithBody("PUT", `/users/super/${superUserId}`, input);
    }

    public deleteChannelUser(userId: string): Promise<ChannelUser> {
        return this.makeRequestWithBody("DELETE", `/users/channel/${userId}`, null);
    }

    public updateSession(userId: string, input: UpdateUserDataInput): Promise<Session> {
        return this.makeRequestWithBody("PUT", `/users/session/${userId}`, input);
    }

    public deleteSession(userId: string): Promise<Session> {
        return this.makeRequestWithBody("DELETE", `/users/session/${userId}`, null);
    }

    public setBaseURL(baseURL: string) {
        this.baseURL = baseURL;
    }
}
