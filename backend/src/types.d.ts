
export type ServerResponse<T> = {
    status: number;
    data?: T;
    message?: string;
}

export type GetBookType = {
    id: number;
    title: string;
    author: string;
}

export type CreateBookType = {
    title: string;
    author: string;
}
