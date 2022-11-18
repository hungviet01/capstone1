export interface SearchModel<T> {
    page: number,
    pageSize: number,
    data: T,
}

export interface ResponseServiceModel<T> {
    total: number;
    data: T[];
}