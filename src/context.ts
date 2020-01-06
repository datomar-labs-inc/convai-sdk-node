import {Flaggable} from "./flaggable";
import {Session} from "./session";
import {Error} from "./context-modifier";

export class Context extends Flaggable {
    public id: string;
    public user: RequestUser;
    public session: Session;
    public text: string;
    public originPlatform: string;
    public originalRequest: any;
    public isStart: boolean;
    public isTrigger: boolean;
    public errors?: Error[];
    public response?: Response;

    constructor() {
        super();

        this.id = "";
        this.user = new RequestUser();
        this.session = new Session();
        this.text = "";
        this.originPlatform = "";
        this.isStart = false;
        this.isTrigger = false;
    }
}

export class RequestUser extends Flaggable {
    public id: string;
    public platformId: string;

    constructor() {
        super();

        this.id = "";
        this.platformId = "";
    }
}