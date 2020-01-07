import {Flaggable} from "./flaggable";
import {Session} from "./session";
import {Error} from "./context-modifier";
import {Response} from "./response";

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

    /**
     * Converts from a plain js object into a Context class
     * @param obj an object with the same fields as a context
     */
    public static fromObject(obj: any): Context {
        const c = new Context();

        c.id = obj.id;
        c.data = obj.data;
        c.user.data = obj.user.data;
        c.user.id = obj.user.id;
        c.user.platformId = obj.user.platformId;
        c.session.data = obj.session.data;
        c.session.ver = obj.session.ver;
        c.text = obj.text;
        c.originPlatform = obj.originPlatform;
        c.originalRequest = obj.originalRequest;
        c.isStart = obj.isStart;
        c.isTrigger = obj.isTrigger;
        c.errors = obj.errors;
        c.response = obj.response;

        return c;
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