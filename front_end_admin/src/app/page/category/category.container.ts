import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { map, Subject, takeUntil } from "rxjs";
import { ActionGridComponent } from "src/app/base/core/components/cells/action-grid/action.component";
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { BASE_STYLE, DEFAULT_PAGE_SIZE, STATUS } from "src/app/base/_helpers/constant";
import { CreateUpdateCategoryComponent } from "./components/create-update-category/create-update-category.component";
import { CategoryModel } from "./models/category.model";
import { CategoryService } from "./services/category.service";

@Component({
    selector: 'app-category-container',
    templateUrl: './category.container.html',
    styleUrls: ['./category.container.scss']
})
export class CategoryContainer implements OnInit, OnDestroy {

    private unsubsribe$: Subject<void> = new Subject();

    public pagination: PaginationModel;
    public rowData: CategoryModel[] = [];
    public columnDef: ColDef[] | any[];
    public currentFormSearch: CategoryModel;

    constructor(
        private matDialog: MatDialog,
        private categoryService: CategoryService,
    ) {}

    public ngOnInit(): void {
        this.pagination = new PaginationModel();
        this.initColumn();
    }

    public initColumn(): void {
        this.columnDef = [
            {
                headerName: 'STT',
                headerTooltip: 'STT',

                minWidth: 60,
                maxWidth: 60,

                cellStyle: BASE_STYLE,
                valueGetter: params => {
                    return params.node.rowIndex + 1 + ( DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                }
            },

            {
                headerName: 'Tên danh mục',
                headerTooltip: 'Tên danh mục',
                field: 'name',
                tooltipField: 'name',

                cellStyle: BASE_STYLE,
            },

            {
                cellRenderer: ActionGridComponent,
                cellRendererParams: {
                    onDelete: this.onDelete.bind(this),
                    onEdit: this.openCreateUpdate.bind(this),
                },
                minWidth: 48,
                maxWidth: 48,
                cellStyle: {
                    'overflow': 'unset',
                    'padding-top': '10px',
                },
            }
        ]
    }

    public onDelete(category: CategoryModel): void {

    }

    public doSearch(category?: CategoryModel, page?: number): void {
        if (category) this.currentFormSearch = category;
        this.pagination.currentPage = page;
        this.categoryService.searchCategoryAndPagination({
            page: this.pagination.currentPage,
            pageSize: DEFAULT_PAGE_SIZE,
            data: this.currentFormSearch
        }).pipe(
            takeUntil(this.unsubsribe$)
        )
        .subscribe(res => {
            this.rowData = res.data;
            this.pagination.dataLength = this.rowData.length;
            this.pagination.totalPage = Math.ceil(res.total / this.pagination.pageSize);
            this.pagination.totalRecord = res.total;
        })
    }

    public openCreateUpdate(category: CategoryModel): void {
        this.matDialog.open(CreateUpdateCategoryComponent, {
            width: '500px',
            height: '250px',
            data: category
        }).afterClosed().subscribe(res => {
            if (res.event === 'save') this.doSearch(this.currentFormSearch, this.pagination.currentPage);
        })
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {

    }

    public ngOnDestroy(): void {
        this.unsubsribe$ && this.unsubsribe$.unsubscribe();
    }

}