import { DEFAULT_PAGE_SIZE } from './../../_helpers/constant';
export class PaginationModel {
    totalRecord: number;
    totalPage: number;
    currentPage: number;
    dataLength: number;
    pageSize?: number;

    constructor() {
        this.totalPage = 1;
        this.totalRecord = 0;
        this.currentPage = 1;
        this.dataLength = 0;
        this.pageSize = DEFAULT_PAGE_SIZE
    }
}