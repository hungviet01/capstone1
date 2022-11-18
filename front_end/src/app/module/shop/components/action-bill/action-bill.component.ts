import { Observable } from 'rxjs';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, TemplateRef } from "@angular/core";
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BillDetail } from '../../interfaces/bill.interface';
import { CurrencyPipe } from '@angular/common';
import { BillService } from '../../services/bill.service';

@Component({
    selector: 'app-action-bill',
    templateUrl: './action-bill.component.html',
    styleUrls: ['./action-bill.component.scss']
})
export class ActionBillComponent implements ICellRendererAngularComp {

    private params: ICellRendererParams<any, any>;
    public columns: ColDef[];
    public rowData$: Observable<BillDetail[]>;
    public ngbModalRef: NgbModalRef;

    constructor(
        private ngbModal: NgbModal,
        private currencyPipe: CurrencyPipe,
        private billService: BillService,
    ) {}

    public agInit(params: ICellRendererParams<any, any>): void {
        this.params = params;
        this.ngInitColumn();
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
                headerName: 'Tên sản phẩm',
                field: 'productName',
                tooltipField: 'productName',
                cellStyle: {
                    'top': '12px'
                }
            },
            {
                headerName: 'Loại sản phẩm',
                field: 'categoryName',
                tooltipField: 'categoryName',
                cellStyle: {
                    'top': '12px'
                }
            },
            {
                headerName: 'Size',
                minWidth: 80,
                maxWidth: 80,
                field: 'sizeName',
                tooltipField: 'sizeName',
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }
            },
            {
                headerName: 'Số lượng',
                minWidth: 120,
                maxWidth: 120,
                field: 'quantity',
                tooltipField: 'quantity',
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }
            },{
                headerName: 'Tổng tiền',
                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.total, 'VND');
                },
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }
            }
        ]
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public showDetail(template: TemplateRef<any>): void {
        this.rowData$ = this.billService.getBillDetail(this.params.data.id);
        this.ngbModalRef = this.ngbModal.open(template, {
            centered: true,
            animation: true,
            size: 'lg'
        });
    }
}