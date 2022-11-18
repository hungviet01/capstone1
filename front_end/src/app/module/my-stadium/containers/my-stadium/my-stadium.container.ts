import { Stadium } from './../../../booking/interfaces/stadium.interface';
import { Paginator } from './../../../../core/interfaces/paginator.interface';
import { StadiumService } from 'src/app/module/my-stadium/services/stadium.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil, filter } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-stadium',
    templateUrl: './my-stadium.container.html',
    styleUrls: ['./my-stadium.container.scss']
})
export class MyStadiumContainer implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public paginator: Paginator = new Paginator();
    public searchName: string;
    public stadiumList: Stadium[];

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private stadiumService: StadiumService
    ) {}

    public ngOnInit(): void {
       this.paginate();
    }

    public paginate(): void {
        this.stadiumService.getMineStadium({
            page: this.paginator.currentPage,
            pageSize: this.paginator.pageSize,
            data: {
                name: this.searchName
            }
        })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.stadiumList = res.data;
            this.paginator.total = res.total;
        })
    }

    public createStadium(): void {
        this.router.navigate(['my-stadium', 'create-stadium'])
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}