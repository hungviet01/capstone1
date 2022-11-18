import { RequestPagination } from './../../../../core/interfaces/paginator.interface';
import { takeUntil, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Paginator } from 'src/app/core/interfaces/paginator.interface';
import { StadiumService } from 'src/app/module/my-stadium/services/stadium.service';
import { Stadium } from '../../interfaces/stadium.interface';

@Component({
    selector: 'app-stadium-container',
    templateUrl: './stadium.container.html',
    styleUrls: ['./stadium.container.scss']
})
export class StadiumContainer implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();

    public paginator: Paginator = new Paginator();
    public currentFormSearch: any;
    public stadiumList: Stadium[];

    constructor(
        private stadiumService: StadiumService,
    ) {}
    
    public ngOnInit(): void {}

    public ngOnSearch(formSearch?): void {
        if (formSearch) this.currentFormSearch = formSearch;
        const data: RequestPagination<any> = {
            page: this.paginator.currentPage,
            pageSize: this.paginator.pageSize,
            data: this.currentFormSearch,
        }
        this.stadiumService.searchStadium(data)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.stadiumList = res.data;
                this.paginator.total = res.total;
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}