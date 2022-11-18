export class Paginator {
    currentPage: number;
    pageSize: number;
    total: number;

    constructor() {
        this.pageSize = 20;
        this.currentPage = 1;
    }
}

export class RequestPagination<T> {
    data: T;
    page: number;
    pageSize: number;
}

export class ResponsePagination<T> {
    data: T;
    total: number;
}