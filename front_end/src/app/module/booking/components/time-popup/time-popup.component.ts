import { Role } from 'src/app/base/constant';
import { DataService } from './../../../../core/services/data.service';
import { Stadium } from './../../interfaces/stadium.interface';
import { ConfirmComponent } from './confirm/confirm.component';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvailableStadium } from '../../interfaces/stadium.interface';
import { Time } from '../../interfaces/time.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-time-popup',
    templateUrl: './time-popup.component.html',
    styleUrls: ['./time-popup.component.scss']
})
export class TimePopupComponent implements OnInit {

    public data: AvailableStadium[];
    public stadium: Stadium;

    public get isLogin(): boolean {
        return this.dataService.currentUser$.getValue()
            && this.dataService.currentUser$.getValue().userDto.role == Role.USER
        ;
    }

    constructor(
        public activeModal: NgbActiveModal,
        private ngbModal: NgbModal,
        private dataService: DataService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
    }

    public booking(time: Time, date: string): void {
        if (!this.isLogin) {
            this.activeModal.close();
            this.router.navigate(['auth', 'login'], {
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
        ref.componentInstance.stadium = this.stadium;
        ref.componentInstance.date = date;
        ref.componentInstance.time = time;
    }
}