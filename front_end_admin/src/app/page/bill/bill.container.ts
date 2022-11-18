import { BillActionComponent } from './components/action/bill-action.component';
import { DatePipe } from '@angular/common';
import { BillService } from './services/bill.service';
import { Component, OnInit } from "@angular/core";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { BASE_STYLE, DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { CurrencyPipe } from '@angular/common';
import { BillModel } from './models/bill.model';

@Component({
    selector: 'app-bill-container',
    templateUrl: './bill.container.html',
    styleUrls: ['./bill.container.scss']
})
export class BillContainer implements OnInit {

    public pagination: PaginationModel;
    public rowData: BillModel[] = [];
    public columnDef: ColDef[] | any[];
    public currentFormSearch: BillModel;

    constructor(
        private billService: BillService,
        private currencyPipe: CurrencyPipe,
        private datePipe: DatePipe
    ) {}

    public ngOnInit(): void {
        this.pagination = new PaginationModel();
        this.initColumn();
    }

    public doSearch(bill: BillModel, page: number): void {
        if (bill) this.currentFormSearch = bill;
        this.pagination.currentPage = page;
        this.billService.search({
            data: this.currentFormSearch,
            page: this.pagination.currentPage,
            pageSize: DEFAULT_PAGE_SIZE
        }).subscribe(res => {
            this.rowData = res.data;
            this.pagination.totalPage = Math.ceil(res.total / this.pagination.pageSize);
            this.pagination.totalRecord = res.total;
            this.pagination.dataLength = this.rowData.length;
        })
    }

    public initColumn(): void {
        this.columnDef = [
            {
                headerName: 'STT',
                headerTooltip: 'STT',

                minWidth: 80,
                maxWidth: 80,
                cellStyle: BASE_STYLE,
                valueGetter: params => {
                    return params.node.rowIndex + 1 + (DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                }
            },

            {
                headerName: 'Mã đơn hàng',
                headerTooltip: 'Mã đơn hàng',
                field: 'id',
                tooltipField: 'id',
                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Người mua',
                headerTooltip: 'Người mua',

                field: 'createdBy',
                tooltipField: 'createdBy',
                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Ngày mua',
                headerTooltip: 'Ngày mua',

                valueGetter: param => this.datePipe.transform(param.data.createdDate, 'dd/MM/yyyy'),
                tooltipValueGetter: param => this.datePipe.transform(param.data.createdDate, 'dd/MM/yyyy'),
                cellStyle: BASE_STYLE,
            },
            
            {
                headerName: 'Tổng tiền',
                headerTooltip: 'Tổng tiền',

                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.total, 'VND');
                },
                tooltipValueGetter: param => {
                    return this.currencyPipe.transform(param.data.total, 'VND');
                },

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Trạng thái',
                headerTooltip: 'Trạng thái',

                cellStyle: BASE_STYLE,
                cellRenderer: StatusComponent,
                values: ['Chờ phê duyệt', 'Đã phê duyệt', 'Từ chối'],
                colors: ['#3366FF', '#52BD94', '#D14343'],
                backgrounds: ['transparent', 'transparent', 'transparent'],
            },

            {
                cellRenderer: BillActionComponent,
                cellStyle: {
                    'overflow': 'unset'
                },
                minWidth: 50,
                maxWidth: 50,
            }
        ]
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {
        
    }
}