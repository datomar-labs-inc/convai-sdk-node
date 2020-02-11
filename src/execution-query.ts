export class ExecutionMatcher {
    private limit: number;
    private offset: number;

    private filters: ExecutionQueryItem[];
    private mustNot: ExecutionQueryItem[];
    private sort: ExecutionSort[];

    private negateCurrent: boolean;
    private currentItem?: ExecutionQueryItem;

    /**
     * Initialize the class
     */
    constructor() {
        this.limit = 10;
        this.offset = 0;

        this.filters = [];
        this.mustNot = [];
        this.sort = [];
        this.negateCurrent = false;
    }

    /**
     * Intialize a query to be performed. This method handles the 'key' part of the query
     * 
     * @param field - The execution field to compare
     */
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

    /**
     * Negate the current execution condition
     */
    public not(): ExecutionMatcher {
        this.negateCurrent = true;
        return this;
    }

    /**
     * Set the limit on results
     * 
     * @param limit - The limit to be set
     */
    public setLimit(limit: number): ExecutionMatcher {
        this.limit = limit;
        return this;
    }

    /**
     * Set the offset on results
     * 
     * @param offset - The offset to be set
     */
    public setOffset(offset: number): ExecutionMatcher {
        this.offset = offset;
        return this;
    }

    /**
     * Sort the executions by the field in ascending order
     * 
     * @param field - The name of the field
     */
    public sortAsc(field: string): ExecutionMatcher {
        this.sort.push({
            asc: true,
            field
        });
        return this;
    }

    /**
     * Sort the executions by the field in descending order
     * 
     * @param field - The name of the field
     */
    public sortDesc(field: string): ExecutionMatcher {
        this.sort.push({
            asc: false,
            field
        });
        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the return set from where 'key' is equal to 'value'
     * 
     * @param value - The value to be compared
     */
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

    /**
     * This method handles the 'value' part of the query. Denotes that the execution data should have the where 'key'
     */
    public exists(): ExecutionMatcher {
        if (this.currentItem === undefined) {
            throw new Error("cannot call exists before calling where")
        }

        this.currentItem.op = Operation.EXISTS;

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the return set from the where 'key' starts with 'value'
     * 
     * @param prefix - The value to be compared
     */
    public hasPrefix(prefix: string): ExecutionMatcher {
        if (this.currentItem === undefined) {
            throw new Error("cannot call hasPrefix before calling where")
        }

        this.currentItem.op = Operation.HAS_PREFIX;
        this.currentItem.matcher = [prefix];

        return this;
    }

    /**
     * This method handles the 'value' part of the query. Denotes that the return set from the where 'key' should be between (low, high) for inclusive = false or [low, high] for inclusive = true
     * 
     * @param low - The lower number
     * @param high - The higher number
     * @param inclusive - Specify if the lower and higher numbers should be inclusive or exclusive
     */
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