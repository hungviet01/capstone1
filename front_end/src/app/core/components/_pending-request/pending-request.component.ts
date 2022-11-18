import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from "@angular/core";
import { ColDef } from 'ag-grid-community';
import { PendingRequest } from 'src/app/module/request/interfaces/request.interface';
import { ActionComponent } from './action/action.component';

@Component({
    selector: 'app-pending-request',
    templateUrl: './pending-request.component.html',
    styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {
    
    @Input() showAction: boolean;
    @Input() stadiumRequest: PendingRequest[] = [];
    
    public columns: ColDef[];

    public ngOnInit(): void {
        this.ngOnInitColumn();
    }

    private ngOnInitColumn(): void {
        this.columns = [
            {
                headerName: 'Tên sân',
                field: 'stadiumName',
                tooltipField: 'stadiumName',
                minWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Loại sân',
                field: 'typeName',
                minWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Ngày thuê',
                valueGetter: ({data}) => {
                    return formatDate(data.hireDate, 'dd-MM-yyyy', 'en-US');
                },
                minWidth: 120,
                maxWidth: 120,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Thời gian',
                valueGetter: ({data}) => {
                    return `${data.startTime}-${data.endTime}`
                },
                minWidth: 150,
                maxWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Người thuê',
                field: 'requester',
                minWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Tìm đối thủ',
                field: 'hasCompetitor',
                minWidth: 130,
                maxWidth: 130,
                cellStyle: {
                    'top': '10px',
                    'text-align': 'center',
                }
            }
        ];
        if (this.showAction) {
            this.columns.push({
                headerName: 'Chấp nhận',
                cellRenderer: ActionComponent,
                minWidth: 120,
                maxWidth: 120,
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }
            })
        }
    }
}