import { GridColumnsChangedEvent, GridReadyEvent } from 'ag-grid-community';
import { CurrencyPipe } from '@angular/common';
import { PaginationModel } from 'src/app/base/core/models/pagination.model';
import { BASE_STYLE } from 'src/app/base/_helpers/constant';
import { ColDef } from 'ag-grid-community';
import { BillDetailModel } from './../../models/bill-detail.model';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { BillService } from './../../services/bill.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, TemplateRef } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-bill-action',
    templateUrl: './bill-action.component.html',
    styleUrls: ['./bill-action.component.scss']
})
export class BillActionComponent implements ICellRendererAngularComp {
   
    public params: ICellRendererParams | any;
    public matDialogRef: MatDialogRef<void>;
    
    // grid
    public columnDef: (ColDef)[];
    public rowData: (BillDetailModel | any)[] = [];

    constructor(
        private billService: BillService,
        private matDialog: MatDialog,
        private currencyPipe: CurrencyPipe
    ) {}

    refresh(params: ICellRendererParams): boolean {
        return true;
    }
   
    agInit(params: ICellRendererParams): void {
        this.params = params;
    }
    
    public onApproveBill(): void {
        if (this.params.data.status === 1) return;
        this.billService.approveBill(this.params.data.id).subscribe(res => {
            this.parent.doSearch(null, this.parent.pagination.currentPage);
        })
    }

    public onCancelBill(): void {
        if (this.params.data.status === 0) return;
        this.billService.cancelBill(this.params.data.id).subscribe(res => {
            this.parent.doSearch(null, this.parent.pagination.currentPage);
        })
    }

    public showBillDetails(template: TemplateRef<void>): void {
        this.initColumn();
        this.matDialogRef = this.matDialog.open(template, {
            width: '800px',

        });
        this.matDialogRef.afterOpened().subscribe(res => {
            this.billService.getBillDetial(this.params.data.id).subscribe(res => {
                this.rowData = res;
            })
        })
    }

    private initColumn(): void {
        this.columnDef = [
            {
                headerName: 'Tên sản phẩm',
                headerTooltip: 'Tên sản phẩm',

                minWidth: 200,
                cellStyle: BASE_STYLE,

                field: 'productName',
                tooltipField: 'productName'
            },
            {
                headerName: 'Loại sẩn phẩm',
                headerTooltip: 'Loại sẩn phẩm',

                minWidth: 150,
                cellStyle: BASE_STYLE,

                field: 'categoryName',
                tooltipField: 'categoryName',
            },

            {
                headerName: 'Size',
                headerTooltip: 'Size',

                minWidth: 150,
                maxWidth: 150,
                cellStyle: BASE_STYLE,

                field: 'sizeName',
                tooltipField: 'sizeName',
            },
            
            {
                headerName: 'Số lượng',
                headerTooltip: 'Số lượng',

                minWidth: 120,
                maxWidth: 120,
                cellStyle: BASE_STYLE,

                field: 'quantity',
                tooltipField: 'quantity',
            },

            {
                headerName: 'Tổng tiền',
                headerTooltip: 'Tổng tiền',

                minWidth: 150,
                cellStyle: BASE_STYLE,

                valueGetter: params => this.currencyPipe.transform(params.data.total, 'VND'),
                tooltipValueGetter: params => this.currencyPipe.transform(params.data.total, 'VND')
            },
        ]
    }

    public gridReady(event: GridReadyEvent): void {
        event.api.sizeColumnsToFit();
    }

    public gridColumnsChanged(event: GridColumnsChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    get parent() {
        return this.params.context.parent;
    }
}