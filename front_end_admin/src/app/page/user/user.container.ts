import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { ConfirmComponent } from "src/app/base/core/components/popup-confirm/popup-confirm.component";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { ACTION_CLOSE, BASE_STYLE, DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { ActionGridComponent } from "./components/action/action.component";
import { UpdateUserComponent } from "./components/update-user/update-user.component";
import { UserModel } from "./models/user.model";
import { UserService } from "./services/user.service";

@Component({
    selector: 'app-user-container',
    templateUrl: './user.container.html',
    styleUrls: ['./user.container.scss']
})
export class UserContainer implements OnInit {

    public columnDef: (ColDef | any)[];
    public rowData: UserModel[];
    public pagination: PaginationModel;
    public currentFormSearch: UserModel;


    constructor(
        private matDialog: MatDialog,
        private userService: UserService,
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
                    return params.node.rowIndex + 1 + (DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                }
            },

            {
                headerName: 'Tên đăng nhập',
                headerTooltip: 'Tên đăng nhập',

                field: 'username',
                tooltipField: 'username',
                cellStyle: BASE_STYLE,

                minWidth: 100,
                maxWidth: 150,
            },

            {
                headerName: 'Họ và tên',
                headerTooltip: 'Họ và tên',

                field: 'fullName',
                tooltipField: 'fullName',

                cellStyle: BASE_STYLE,

                minWidth: 100,
            },

            {
                headerName: 'Số điện thoại',
                headerTooltip: 'Số điện thoại',

                field: 'phone',
                tooltipField: 'phone',
                
                cellStyle: BASE_STYLE,

                minWidth: 100,
                maxWidth: 130,
            },

            {
                headerName: 'Email',
                headerTooltip: 'Email',

                field: 'email',
                tooltipField: 'email',

                cellStyle: BASE_STYLE,

                minWidth: 150,
                maxWidth: 200,
            },

            {
                headerName: 'Chức vụ',
                headerTooltip: 'Chức vụ',

                valueGetter: param => {
                    return param.data.role == 'USER' ? 'Người dùng' : param.data.role == 'OWNER_STADIUM' ? 'Chủ sân' : ''
                },

                cellStyle: BASE_STYLE,

                minWidth: 150,
                maxWidth: 200,
            },

            {
                headerName: 'Trạng thái',
                headerTooltip: 'Trạng thái',

                minWidth: 100,

                cellRenderer: StatusComponent,
                values: ['', 'Mở khóa', 'Khóa' ],
                backgrounds: ['', '#F4FEFF', '#FFEDE4' ],
                colors: ['', '#00A3AE', '#DF642A'],

                cellStyle: BASE_STYLE
            },

            {
                cellRenderer: ActionGridComponent,
                cellRendererParams: {
                    onLock: this.onLock.bind(this),
                    onUnlock: this.onUnlock.bind(this),
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

    public doSearch(user?: UserModel, page?: number): void {
        if (user) this.currentFormSearch = user;
        this.pagination.currentPage = page;
        this.userService.searchUser({
            page: this.pagination.currentPage,
            pageSize: DEFAULT_PAGE_SIZE,
            data: this.currentFormSearch
        })
        .subscribe(res => { 
            
            this.rowData = res.data;
            this.pagination.dataLength = this.rowData.length;
            this.pagination.totalPage = Math.ceil(res.total / this.pagination.pageSize);
            this.pagination.totalRecord = res.total;
        })
    }

    public onLock(user: UserModel): void {
        this.matDialog.open(ConfirmComponent, {
            width: '500px',
            height: '180px',
            data: {
                title: 'Xác nhận xóa',
                message: 'Bạn có chắc chắn muốn khóa tk người dùng?'
            }
        })
        .afterClosed()
        .subscribe((action) => {
            if (action === ACTION_CLOSE) return;
            this.userService
                .lockUser(user.username)
                .subscribe(res => this.doSearch(this.currentFormSearch, this.pagination.currentPage))
        })
    }

    public onUnlock(user: UserModel): void {
        this.matDialog.open(ConfirmComponent, {
            width: '500px',
            height: '180px',
            data: {
                title: 'Xác nhận mở',
                message: 'Bạn có chắc chắn muốn mở khóa tk người dùng?'
            }
        })
        .afterClosed()
        .subscribe((action) => {
            if (action === ACTION_CLOSE) return;
            this.userService
                .unlockUser(user)
                .subscribe(res => this.doSearch(this.currentFormSearch, this.pagination.currentPage))
        })
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {
        event.api.sizeColumnsToFit();
    }
}