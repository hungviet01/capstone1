import { ChallengeActionComponent } from './action/action.component';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { Challenge } from './../../interfaces/request.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from "@angular/core";
import { ColDef } from 'ag-grid-community';

@Component({
    selector: 'app-challenge-request',
    templateUrl: './challenge-request.component.html',
    styleUrls: ['./challenge-request.component.scss']
})
export class ChallengeRequestComponent implements OnInit {

    public rowData: Observable<Challenge[]>;
    public columns: ColDef[];

    constructor(
        public activedModal: NgbActiveModal
    ) {}

    public ngOnInit(): void {
        this.ngOnInitColumn();
    }

    private ngOnInitColumn(): void {
        this.columns = [
            {
                headerName: 'STT',
                valueGetter: param => {
                    return param.node.rowIndex + 1;
                },
                minWidth: 80,
                maxWidth: 80,
                cellStyle: {
                    'display': 'flex',
                    'justify-center': 'center',
                    'align-items': 'center'
                }
            },
            {
                headerName: 'Người yêu cầu',
                field: 'requester',
                tooltipField: 'requester',
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Ngày yêu cầu',
                valueGetter: param => {
                    return formatDate(param.data.createdDate, 'dd-MM-yyyy', 'en-US');
                },
                tooltipValueGetter: param => {
                    return formatDate(param.data.createdDate, 'dd-MM-yyyy', 'en-US');
                },
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Thao tác',
                minWidth: 150,
                maxWidth: 150,
                cellRenderer: ChallengeActionComponent,
                cellStyle: {
                    'display': 'flex',
                    'justify-center': 'center',
                    'align-items': 'center'
                }
            }
        ]
    }

    public closeModal(): void {
        this.activedModal.close();
    }

}