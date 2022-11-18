import { ChallengeRequestComponent } from './../challenge-request/challenge-request.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil, Subject } from 'rxjs';
import { RequestPagination } from './../../../../core/interfaces/paginator.interface';
import { RequestService } from 'src/app/module/request/services/request.service';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from "@angular/core";
import { FindingRequest } from '../../interfaces/finding-request.interface';
import { CurrencyPipe, formatDate } from '@angular/common';
import { AG_GRID_CELL_STYLE } from 'src/app/base/constant';
import { Paginator } from 'src/app/core/interfaces/paginator.interface';

@Component({
    selector: 'app-finding-request-container',
    templateUrl: './finding-request.container.html',
    styleUrls: ['./finding-request.container.scss']
})
export class FindingRequestContainer implements OnInit {

    private unsubscribe$: Subject<void> = new Subject();
    
    public columnDef: ColDef[];
    public rowData: FindingRequest[] = [];
    public paginator: Paginator = new Paginator();
    private currentFormSearch: any;

    constructor(
        private currencyPipe: CurrencyPipe,
        private requestService: RequestService,
        private ngbModal: NgbModal,
    ) {}

    public ngOnInit(): void {
        this.columnDef = [
            {
                headerName: 'Hình ảnh',
                headerClass: 'header-text-center',
                cellStyle: {
                    'display': 'flex',
                    'align-items': 'center'
                },
                minWidth: 200,
                maxWidth: 200,
                cellRenderer: params => {
                    return `<img class="w-100 h-100" src="${params.data.avatar}" />`
                }
            },
            {
                headerName: 'Tên sân',
                field: 'stadiumName',
                tooltipField: 'stadiumName',
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Địa chỉ',
                field: 'stadiumAddress',
                tooltipField: 'stadiumAddress',
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Thời gian',
                cellRenderer: ({data}) => {
                    return `<div class="text-center">
                        <div>${data.startTime}-${data.endTime}</div> 
                        <div>${formatDate(data.hireDate, 'dd-MM-yyyy', 'en-US')}</div>
                    </div>`
                },
                minWidth: 150,
                maxWidth: 150,
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Loại sân',
                field: 'typeName',
                tooltipField: 'typeName',
                minWidth: 100,
                maxWidth: 100,
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Giá sân',
                valueGetter: params => {
                    return this.currencyPipe.transform(params.data.price, 'VND');
                },
                tooltipValueGetter: params => {
                    return this.currencyPipe.transform(params.data.price, 'VND');
                },
                minWidth: 100,
                maxWidth: 100,
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
        ];
    }

    public ngOnSearch(formSearch?): void {
        if (formSearch) this.currentFormSearch = formSearch;
        const body: RequestPagination<any> = {
            page: this.paginator.currentPage,
            pageSize: this.paginator.pageSize,
            data: this.currentFormSearch
        }
        this.requestService.getFindingRequest(body)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.paginator.total = res.total;
                this.rowData = res.data;
            })
    }

    public rowClick(rowData): void {
        const ref = this.ngbModal.open(ChallengeRequestComponent, {
            centered: true,
            animation: true,
            size: 'lg'
        })
        ref.componentInstance.rowData = this.requestService.getChallengeRequest(rowData.id);
    }
}