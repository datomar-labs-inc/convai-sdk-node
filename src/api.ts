import request from 'request-promise-native';
import {SuperUser, UserQuery, UserQueryResult} from "./user-query";
import {BroadcastInput, BroadcastResult} from "./broadcast";
import {UpdateUserDataInput} from "./update-user-data";

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

    public queryUsers(query: UserQuery): Promise<UserQueryResult> {
        return this.makeRequestWithBody("POST", `/users/query?limit=${query.limit}&offset=${query.offset}`, query);
    }

    public broadcast(input: BroadcastInput): Promise<BroadcastResult> {
        return this.makeRequestWithBody("POST", "/broadcast", input);
    }

    public updateUserData(superUserId: string, input: UpdateUserDataInput): Promise<SuperUser> {
        return this.makeRequestWithBody("PUT", `/users/${superUserId}/data`, input);
    }

    public reachableUsers(query: UserQuery): Promise<number> {
        return this.makeRequestWithBody("POST", "/reachable-users", query).then((r: any) => r.count);
    }
}
