export interface ResponseDataType<T> {
    pageCursor: { next: string | null; previous: string | null };
    pageEdges: {
        cursor: string | null;
        node: T;
    }[];
    totalCount: number;
}

export interface ResponseType {
    data: ResponseDataType<unknown>;
    message: string;
    status: number;
}
