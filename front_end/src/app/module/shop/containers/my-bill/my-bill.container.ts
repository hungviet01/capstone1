import { Bill } from './../../interfaces/bill.interface';
import { BillStatus } from './../../../../base/constant';
import { CurrencyPipe, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { Paginator } from "src/app/core/interfaces/paginator.interface";
import { BillService } from '../../services/bill.service';
import { Subject, takeUntil } from 'rxjs';
import { ActionBillComponent } from '../../components/action-bill/action-bill.component';

@Component({
    selector: 'app-my-bill',
    templateUrl: './my-bill.container.html',
    styleUrls: ['./my-bill.container.scss']
})
export class MyBillContainer implements OnInit, OnDestroy {
    
    private unsubscribe: Subject<void> = new Subject();

    public columns: ColDef[];
    public rowData: Bill[];
    public paginator: Paginator = new Paginator();
    public billStatusList = BillStatus;

    public buyDate;
    public billCode;
    public statusBill;

    constructor(
        private currencyPipe: CurrencyPipe,
        private billService: BillService,
    ) {}

    public ngOnInit(): void {
        this.ngInitColumn();
        this.ngOnSearch();
    }

    private ngInitColumn(): void {
        this.columns = [
            {
                headerName: 'STT',
                minWidth: 70,
                maxWidth: 70,
                valueGetter: param => {
                    return param.node.rowIndex + 1;
                },
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }
            },
            {
                headerName: 'Mã đơn hàng',
                minWidth: 150,
                field: 'id',
                tooltipField: 'id',
                cellStyle: {
                    'top': '12px'
                }
            },
            {
                headerName: 'Ngày mua hàng',
                minWidth: 150,
                valueGetter: params => {
                    return formatDate(params.data.createdDate, 'dd-MM-yyyy', 'en-US')
                },
                cellStyle: {
                    'top': '12px'
                }
            },
            {
                headerName: 'Trạng thái',
                minWidth: 150,
                field: 'statusName',
                tooltipField: 'statusName',
                cellStyle: {
                    'top': '12px'
                }
            },
            {
                headerName: 'Tổng tiền',
                minWidth: 120,
                valueGetter: params => {
                    return this.currencyPipe.transform(params.data.total, 'VND');
                },
                cellStyle: {
                    'top': '12px'
                }
            },
            {
                cellRenderer: ActionBillComponent,
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }
            }
        ]
    }

    public ngOnSearch(): void {
        this.billService.getMyBill({
            page: this.paginator.currentPage,
            pageSize: this.paginator.pageSize,
            data: {
                id: this.billCode,
                createdDate: this.buyDate,
                status: this.statusBill,
            }
        })
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(res => {
            this.paginator.total = res.total;
            this.rowData = res.data;
        })
    }

    public ngOnDestroy(): void {
        this.unsubscribe?.next();
        this.unsubscribe?.complete();
    }
}