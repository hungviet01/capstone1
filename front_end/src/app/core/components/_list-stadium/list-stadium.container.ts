import { Router } from '@angular/router';
import { Stadium } from '../../../module/booking/interfaces/stadium.interface';
import { Component, Input,  TemplateRef } from "@angular/core";
import { BookingService } from "../../../module/booking/services/booking.service";
import { Subject } from 'rxjs';

@Component({
    selector: 'app-list-stadium-container',
    templateUrl: './list-stadium.container.html',
    styleUrls: ['./list-stadium.container.scss']
})
export class ListStadiumContainer {

    private unsubscribe$: Subject<any> = new Subject();

    @Input() lg: number = 4;
    @Input() md: number = 3;
    @Input() sm: number = 2;
    @Input() actionInCard: TemplateRef<any>;
    @Input() clickableCard: boolean = true;
    @Input() stadiumList: Stadium[];

    constructor(
        private router: Router
    ) {}

    public showDetail(stadium: Stadium): void {
        this.router.navigate(['stadium', stadium.id])
    }

    public get colClass(): string {
        return `col-lg-${12/this.lg} col-md-${12/this.md} col-sm-${12/this.sm}`
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}