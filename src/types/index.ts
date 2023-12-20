export type CursorType = { cursor: string; isCurrent: boolean; page: number };

export type PageEdge<T> = {
    cursor: string;
    node: T;
};

export type PageCursors = {
    around: CursorType[];
    next: CursorType;
    previous: CursorType;
};

export type DataType<T> = {
    pageCursors: PageCursors;
    pageEdges: PageEdge<T>[];
    totalCount: number;
};

export type QueryParamsType = {
    term?: string;
    status?: boolean;
    size?: number;
    direction?: string;
    cursor?: string;
    mode?: string;
    orderBy?: string;
    departmentId?: string;
    [key: string]: any;
};
