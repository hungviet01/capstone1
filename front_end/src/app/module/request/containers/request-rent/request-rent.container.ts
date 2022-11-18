import { PendingRequest } from './../../interfaces/request.interface';
import { Subject, takeUntil } from 'rxjs';
import { Paginator } from './../../../../core/interfaces/paginator.interface';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { RequestService } from '../../services/request.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-request-rent-container',
    templateUrl: './request-rent.container.html',
    styleUrls: ['./request-rent.container.scss']
})
export class RequestRentContainer implements OnInit, OnDestroy {
    
    private unsubscribe$: Subject<void> = new Subject();
    private currentFormSearch;

    public data: PendingRequest[];
    public paginator: Paginator = new Paginator();

    constructor(
        private requestService: RequestService,
        private spinnerService: SpinnerService,
        private dataService: DataService,
    ) {}

    public ngOnInit(): void {
        this.dataService.reloadRequestStadium$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(isReload => {
                if (!isReload) return;
                this.ngOnSearch();
            })
    }

    public ngOnSearch(formSearch?): void {
        this.spinnerService.show();
        if (formSearch) this.currentFormSearch = formSearch;
        this.requestService.getStadiumRequest({
            page: this.paginator.currentPage,
            pageSize: this.paginator.pageSize,
            data: this.currentFormSearch
        }).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
            this.paginator.total = res.total;
            this.data = res.data;
            this.spinnerService.hide();
        })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}