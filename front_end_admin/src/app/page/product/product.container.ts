import { Component, OnDestroy, OnInit } from "@angular/core";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { ActionGridComponent } from "src/app/base/core/components/cells/action-grid/action.component";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { ACTION_CLOSE, BASE_STYLE, DEFAULT_PAGE_SIZE, INACTIVE } from "src/app/base/_helpers/constant";
import { FormSearchProductModel } from "./models/form-search-product.model";
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateProductComponent } from "./components/create-update-product/create-update-product.component";
import { ProductModel } from "./models/product.model";
import { ProductCodeCellComponent } from "./components/product-code/product-code-cell.component";
import { ConfirmComponent } from "src/app/base/core/components/popup-confirm/popup-confirm.component";
import { ProductService } from "./services/product.service";
import { map, Subject, takeUntil } from "rxjs";
import { CurrencyPipe, formatDate } from "@angular/common";
import { CategoryService } from "../category/services/category.service";
import { CategoryModel } from "../category/models/category.model";
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-product-container',
    templateUrl: './product.container.html',
    styleUrls: ['./product.container.scss']
})
export class ProductContainer implements OnInit, OnDestroy {

    unsubscribe$: Subject<void> = new Subject();

    currentDataSearch: FormSearchProductModel;

    columnDefs: (ColDef | any)[] = [];
    rowData: ProductModel[];
    pagination: PaginationModel;
    categoryList: CategoryModel[];

    constructor(
        private matDialog: MatDialog,
        private productService: ProductService,
        private categoryService: CategoryService,
        private toastService: ToastrService,
        private currencyPipe: CurrencyPipe,
    ) {}

    ngOnInit(): void {
        this.pagination = new PaginationModel();
        this.initColumn();
        this.getCategory();
    }

    initColumn(): void {
        this.columnDefs = [
            {
                headerName: 'STT',
                headerTooltip: 'STT',

                minWidth: 60,
                maxWidth: 60,

                valueGetter: params => {
                    return params.node.rowIndex + 1 + ( DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                },

                cellStyle: BASE_STYLE,
            },
          
            {
                headerName: 'T??n s???n ph???m',
                headerTooltip: 'T??n s???n ph???m',

                minWidth: 150,

                field: 'name',
                tooltipField: 'name',

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Lo???i s???n ph???m',
                headerTooltip: 'Lo???i s???n ph???m',

                minWidth: 150,

                field: 'categoryName',
                tooltipField: 'categoryName',

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Gi??',
                headerTooltip: 'Gi??',

                minWidth: 100,

                valueGetter: params => this.currencyPipe.transform(params.data.price, 'VND'),
                tooltipValueGetter: params => this.currencyPipe.transform(params.data.price, 'VND'),

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Ng??y t???o',
                headerTooltip: 'Ng??y t???o',

                minWidth: 100,

                tooltipValueGetter: params => {
                    return formatDate(params.data.createdDate, 'dd/MM/yyyy', 'en_US');
                },
                valueGetter: params => {
                    return formatDate(params.data.createdDate, 'dd/MM/yyyy', 'en_US');
                },

                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Tr???ng th??i',
                headerTooltip: 'Tr???ng th??i',

                minWidth: 100,

                cellRenderer: StatusComponent,
                values: ['Kh??ng ho???t ?????ng', 'Ho???t ?????ng'],
                backgrounds: ['#FFEDE4', '#F4FEFF'],
                colors: ['#DF642A', '#00A3AE'],

                cellStyle: BASE_STYLE
            },

            {
                cellRenderer: ActionGridComponent,
                cellRendererParams: {
                    onDelete: this.doDelete.bind(this),
                    onEdit: this.doEdit.bind(this),
                },

                minWidth: 48,
                maxWidth: 48,

                cellStyle: {
                    'overflow': 'unset',
                    'padding-top': '10px',
                }
            }
        ]
    }

    doSearch(page?: number, data?: FormSearchProductModel): void {
        if (data) this.currentDataSearch = data;
        this.pagination.currentPage = page;
        this.productService
            .doSearch({
                page: this.pagination.currentPage,
                pageSize: DEFAULT_PAGE_SIZE,
                data: this.currentDataSearch
            })
            .pipe(
                takeUntil(this.unsubscribe$),
            )
            .subscribe(res => {
                this.rowData = res.data;
                this.pagination.dataLength = res.data.length;
                this.pagination.totalPage = Math.ceil(res.total / this.pagination.pageSize);
                this.pagination.totalRecord = res.total;
            })
    }

    doDelete(data: ProductModel): void {
        this.matDialog.open(ConfirmComponent, {
            width: '500px',
            height: '180px',
            data: {
                title: 'X??c nh???n x??a',
                message: 'B???n c?? ch???c ch???n mu???n x??a s???n ph???m?'
            }
        }).afterClosed().subscribe(event => {
            if (event === ACTION_CLOSE) return;
            if (data.status === INACTIVE) {
                this.toastService.warning('S???n ph???m ??ang ??? tr???ng th??i kh??ng ho???t ?????ng')
                return;
            }
            this.productService
                .deleteProduct(data.id)
                .subscribe(res => this.doSearch(this.pagination.currentPage, this.currentDataSearch))
        })
    }

    doEdit(data: ProductModel): void {
        this.openCreateUpdate(data);
    }

    getCategory(): void {
        this.categoryService
            .getCategoryNotPagination()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(res => {
                this.categoryList = res;
            })
    }


    openCreateUpdate(data: ProductModel): void {
        
        this.matDialog.open(CreateUpdateProductComponent, {
            width: '1000px',
            data: {
                product: data,
                categoryList: this.categoryList,
            },
        }).afterClosed().subscribe(event => {
            if (event.action === 'save') this.doSearch(this.pagination.currentPage, this.currentDataSearch);
        })
    }

    onGridReady(event: GridReadyEvent): void {
        event.api.sizeColumnsToFit();
    }

    gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    ngOnDestroy(): void {
        this.unsubscribe$ && this.unsubscribe$.unsubscribe();
    }

}