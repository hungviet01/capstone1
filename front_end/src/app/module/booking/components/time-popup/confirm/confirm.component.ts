import { Subject, takeUntil } from 'rxjs';
import { UserDTO } from './../../../../../core/interfaces/user.interface';
import { Stadium } from './../../../interfaces/stadium.interface';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Time } from '../../../interfaces/time.interface';
import { DataService } from 'src/app/core/services/data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/module/request/services/request.service';
import { Request } from 'src/app/module/request/interfaces/request.interface';

@Component({
    selector: 'app-confirm-booking',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();

    public stadium: Stadium;
    public time: Time;
    public date: string;
    public currentUser: UserDTO;

    public isFindCompetitor: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private dataService: DataService,
        private requestService: RequestService,
    ) {}

    public ngOnInit(): void {
        this.currentUser = this.dataService.currentUser$.getValue().userDto;
    }

    public submit(): void {
        const request: Request = {
            stadiumDetailId: this.time.id,
            hasCompetitor: this.isFindCompetitor,
            hireDate: this.date
        }
        this.requestService.requestStadium(request)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.activeModal.close();
                this.dataService.reloadRequestStadium$.next(true);
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}