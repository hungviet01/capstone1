import { DataService } from './../../../../core/services/data.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tree } from 'src/app/core/interfaces/table.interface';
import { Component, OnInit } from '@angular/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { CurrencyPipe } from '@angular/common';
import { Battle } from '../../interfaces/battle.interface';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ConfirmComponent } from 'src/app/core/components/_confirm/_confirm.component';
import { Confirm } from 'src/app/core/interfaces/confirm.interface';
import { filter } from 'rxjs';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
    selector: 'app-battle-popup',
    templateUrl: './battle-popup.component.html',
    styleUrls: ['./battle-popup.component.scss']
})
export class BattlePopupComponent implements OnInit {

    public columnDef: ColDef[];
    public rowData: Battle[];
    public groupHeader: ColDef = {
        headerName: 'Thời gian',
        minWidth: 100,
        cellStyle: {
            'top': '10px'
        }
    }

    constructor(
        private currencyPipe: CurrencyPipe,
        public activeModal: NgbActiveModal,
    ) {}

    public ngOnInit(): void {
        this.columnDef = [
            {
                headerName: 'Giá sân',
                minWidth: 100,
                maxWidth: 100,
                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.price, 'VND');
                },
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Tên đối thủ',
                field: 'competitor',
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Nhận kèo',
                cellRenderer: ActionBattleComponent,
                minWidth: 120,
                maxWidth: 120,
                cellStyle: {
                    'display': 'flex',
                    'align-items': 'center',
                    'top': '10px',
                }
            }
        ]
    }
}

@Component({
    selector: 'app-action',
    template: '<i *ngIf="!params.data.isRoot" class="fas fa-handshake cursor-pointer" (click)="sendChallengeRequest()"></i>'
})
export class ActionBattleComponent implements ICellRendererAngularComp {
    
    public params: ICellRendererParams<Battle, any>;

    public get isLogin(): boolean {
        return this.dataService.currentUser$.getValue() != null;
    }

    constructor(
        private ngbModal: NgbModal,
        private dataService: DataService,
        private router: Router,
        private bookingService: BookingService,
    ) {}

    public agInit(params: ICellRendererParams<Battle, any>): void {
        this.params = params;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public sendChallengeRequest(): void {
        if (!this.isLogin) {
            this.router.navigate(['/auth', 'login'], {
                queryParams: {
                    returnUrl: this.router.url
                }
            })
            return;
        }
        const ref = this.ngbModal.open(ConfirmComponent, {
            centered: true,
            animation: true
        });

        const content: Confirm = {
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn gửi lời thách đấu?'
        }
        ref.componentInstance.content = content;
        ref.closed
        .pipe(filter(res => res))
        .subscribe(res => {
            this.bookingService.sendChallengeRequest(this.params.data.id).subscribe();
        })
    }

}