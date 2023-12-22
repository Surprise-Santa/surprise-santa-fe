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
    size?: number;
    direction?: string;
    cursor?: string;
    orderBy?: string;
    [key: string]: any;
};
