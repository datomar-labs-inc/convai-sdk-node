export class ExecutionMatcher {
    private limit: number;
    private offset: number;

    private filters: ExecutionQueryItem[];
    private mustNot: ExecutionQueryItem[];
    private sort: ExecutionSort[];

    private negateCurrent: boolean;
    private currentItem?: ExecutionQueryItem;

    constructor() {
        this.limit = 10;
        this.offset = 0;

        this.filters = [];
        this.mustNot = [];
        this.sort = [];
        this.negateCurrent = false;
    }

    public where(field: string): ExecutionMatcher {
        field = field.trim();

        if (field.length === 0) {
            throw new Error("cannot query blank field");
        }

        if (this.currentItem !== undefined) {
            if (this.negateCurrent) {
                this.mustNot.push(this.currentItem);
            } else {
                this.filters.push(this.currentItem);
            }
        }

        this.currentItem = {
            field: field,
            op: Operation.EQUALS,
        };
        this.negateCurrent = false;

        return this;
    }

    public not(): ExecutionMatcher {
        this.negateCurrent = true;
        return this;
    }

    public setLimit(limit: number): ExecutionMatcher {
        this.limit = limit;
        return this;
    }

    public setOffset(offset: number): ExecutionMatcher {
        this.offset = offset;
        return this;
    }

    public sortAsc(field: string): ExecutionMatcher {
        this.sort.push({
            asc: true,
            field
        });
        return this;
    }

    public sortDesc(field: string): ExecutionMatcher {
        this.sort.push({
            asc: false,
            field
        });
        return this;
    }

    public equals(...value: string[]): ExecutionMatcher {
        if (this.currentItem === undefined) {
            throw new Error("cannot call equals before calling where")
        }

        if (!this.currentItem.matcher) {
            this.currentItem.matcher = [];
        }

        this.currentItem.op = Operation.EQUALS;
        this.currentItem.matcher.push(...value);

        return this;
    }

    public exists(): ExecutionMatcher {
        if (this.currentItem === undefined) {
            throw new Error("cannot call exists before calling where")
        }

        this.currentItem.op = Operation.EXISTS;

        return this;
    }

    public hasPrefix(prefix: string): ExecutionMatcher {
        if (this.currentItem === undefined) {
            throw new Error("cannot call hasPrefix before calling where")
        }

        this.currentItem.op = Operation.HAS_PREFIX;
        this.currentItem.matcher = [prefix];

        return this;
    }

    public between(low: string, high: string, inclusive: boolean): ExecutionMatcher {
        if (this.currentItem === undefined) {
            throw new Error("cannot call between before calling where")
        }

        if (inclusive) {
            this.currentItem.op = Operation.BETWEEN_INCLUSIVE;
        } else {
            this.currentItem.op = Operation.BETWEEN_EXCLUSIVE;
        }

        this.currentItem.lowerBound = low;
        this.currentItem.upperBound = high;

        return this;
    }
}

interface ExecutionQueryItem {
    op: number;
    field: string;
    matcher?: string[];
    lowerBound?: string;
    upperBound?: string;
}

interface ExecutionSort {
    field: string;
    asc: boolean;
}

enum Operation {
    EQUALS, EXISTS, BETWEEN_EXCLUSIVE, BETWEEN_INCLUSIVE, HAS_PREFIX
}