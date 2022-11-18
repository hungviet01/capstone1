import { CurrencyPipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { filter, Subject, takeUntil } from "rxjs";
import { Paginator } from "src/app/core/interfaces/paginator.interface";
import { ToastService } from "src/app/core/services/toast.service";
import { ActionCartComponent } from "../../components/action-cart/action-cart.component";
import { ConfirmPaymentComponent } from "../../components/confirm-payment/confirm-payment.component";
import { QuantityActionComponent } from "../../components/quantity-action/quantity-action.component";
import { Cart } from "../../interfaces/cart.interface";
import { CartService } from "../../services/cart.service";

@Component({
    selector: 'app-cart-container',
    templateUrl: './my-cart.container.html',
    styleUrls: ['./my-cart.container.scss']
})
export class MyCartContainer implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    private gridReady: GridReadyEvent;
    private currentDataSearch;

    public columns: ColDef[];
    public rowDatas: Cart[];
    public paginator: Paginator = new Paginator();

    public get totalBill() {
        const data = this.gridReady?.api?.getSelectedRows();
        return data?.reduce((total, cur) => total + cur.total, 0);
    }

    constructor(
        private ngbModal: NgbModal,
        private cartService: CartService,
        private currencyPipe: CurrencyPipe,
        private toastService: ToastService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
        this.ngInitColumn();
    }

    private ngInitColumn(): void {
        this.columns = [
            {
                checkboxSelection: true,
                headerCheckboxSelection: true,
                minWidth: 60,
                maxWidth: 60,
                cellStyle: {
                    'top': '25px'
                }
            },
            {
                headerName: 'Hình ảnh',
                minWidth: 200,
                maxWidth: 200,
                cellRenderer: param => {
                    return `<img style="height: 70px" class="w-100" src="${param.data.avatarProduct}"/>`
                },
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Tên sản phẩm',
                minWidth: 120,
                field: 'productName',
                tooltipField: 'productName',
                cellStyle: {
                    'top': '25px'
                }
            },
            {
                headerName: 'Loại sản phẩm',
                minWidth: 150,
                maxWidth: 150,
                field: 'categoryName',
                tooltipField: 'categoryName',
                cellStyle: {
                    'top': '25px'
                }
            },
            {
                headerName: 'Size',
                minWidth: 80,
                maxWidth: 80,
                field: 'sizeName',
                tooltipField: 'sizeName',
                cellStyle: {
                    'top': '25px'
                }
            },
            {
                headerName: 'Số lượng',
                cellRenderer: QuantityActionComponent,
                minWidth: 130,
                maxWidth: 130,
                cellStyle: {
                    'top': '25px'
                }
            },
            {
                headerName: 'Tổng tiền',
                minWidth: 130,
                maxWidth: 130,
                field: 'total',
                valueFormatter: param => {
                    return this.currencyPipe.transform(param.data.total, 'VND');
                },
                cellStyle: {
                    'top': '25px'
                }
            },
            {
                headerName: 'Thao tác',
                minWidth: 120,
                maxWidth: 120,
                cellRenderer: ActionCartComponent,
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }
            }
        ]
    }

    public ngOnSearch(dataSearch): void {
        if (dataSearch) this.currentDataSearch = dataSearch;
        this.cartService.getMyCart({
            page: this.paginator.currentPage,
            pageSize: this.paginator.pageSize,
            data: this.currentDataSearch
        })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.paginator.total = res.total;
            this.rowDatas = res.data;
        })
    }

    public afterTableInit(gridReady: GridReadyEvent): void {
        this.gridReady = gridReady;
    }

    public payment(): void {
        const data = this.gridReady.api.getSelectedRows();
        if (!data.length) {
            this.toastService.error('Bạn chưa chọn sản phẩm thanh toán.')
            return;
        }
        const ref = this.ngbModal.open(ConfirmPaymentComponent, {
            centered: true,
            animation: true
        });

        ref.componentInstance.totalBill = this.totalBill;

        ref.closed
        .pipe(filter(res => res))
        .subscribe(res => {
            this.cartService.checkout({
                ...res,
                carts: data
            }).subscribe(res => {
                this.toastService.success('Đặt hàng thành công.');
                this.router.navigate(['/shop', 'my-bill']);
            })
        })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}