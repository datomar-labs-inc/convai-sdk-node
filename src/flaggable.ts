export class Flaggable {
    public data: { [key: string]: any };

    constructor() {
        this.data = {};
    }

    public get<T>(key: string): T {
        return this.data[key];
    }

    public clear() {
        this.data = {};
    }
}