import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { DEFAULT_PAGE_SIZE, DOT_DOT_DOT } from "src/app/base/_helpers/constant";
import { PaginationModel } from "../../models/pagination.model";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

    @Output()
    paginate: EventEmitter<number> = new EventEmitter();

    @Input() totalRecord: number;
    @Input() totalPage: number;
    @Input() currentPage: number;
    @Input() dataLength: number;
    @Input() pageSize: number;

    pageWithDots: any[];
    first: number;
    last: number;

    constructor() { }

    ngOnInit(): void {
        this.calculatePage();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.calculatePage();
    }

    onPaginate(page: number): void {
        this.currentPage = page;
        this.paginate.emit(this.currentPage);
    }

    onPrevPage(): void {
        if (this.currentPage === 1) {
            return;
        }
        this.currentPage--;
        this.onPaginate(this.currentPage);
    }

    onNextPage(): void {
        if (this.currentPage === this.totalPage) {
            return;
        }
        this.currentPage++;
        this.onPaginate(this.currentPage);
    }

    calculatePage(): void {
        this.first = (this.currentPage - 1) * (this.pageSize || DEFAULT_PAGE_SIZE) + 1;
        this.last = (this.currentPage - 1) * (this.pageSize || DEFAULT_PAGE_SIZE) + this.dataLength
        this.handlePages((this.currentPage - 1), this.totalPage);
    }


    handlePages(current: number, totalPage: number): void {
        const DETAL = 2;
        const left = current - DETAL;
        const right = current + DETAL + 1;
        let fake = null;

        const pageCache: number[] = [];
        this.pageWithDots = [];

        for (let i = 1; i <= totalPage; i++) {
            if (i == 1 || i == totalPage || (i >= left && i <= right)) {
                pageCache.push(i);
            }
        }

        for (const page of pageCache) {
            if (fake) {
                if (page - fake === DETAL) {
                    this.pageWithDots.push(fake + 1)
                } else if (page - fake !== 1) {
                    this.pageWithDots.push(DOT_DOT_DOT)
                }
            }
            this.pageWithDots.push(page);
            fake = page;
        }
    }
}