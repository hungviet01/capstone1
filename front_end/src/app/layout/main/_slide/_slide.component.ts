import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { filter, interval, Subject, takeUntil } from "rxjs";

@Component({
    selector: 'app-slide',
    templateUrl: './_slide.component.html',
    styleUrls: ['./_slide.component.scss']
})
export class SlideComponent implements OnInit, OnDestroy {
    
    private unsubscribe$: Subject<any> = new Subject();
    public currentImageIndex = 0;
    private _translateX: string;

    constructor(
        public router: Router
    ) {}

    public ngOnInit(): void {
        interval(3000)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                if (this.currentImageIndex == 3) this.currentImageIndex = -1;
                this.currentImageIndex += 1;
                this.translateX = this.currentImageIndex + '';
            })
    }

    public set translateX(index) {
        this._translateX = `translateX(-${+index * 100}vw)`
    }

    public get translateX() {
        return this._translateX;
    }

    public scrollToBooking(): void {
        const bookingContainer = document.querySelector('app-stadium-container') as HTMLElement;
        bookingContainer.scrollIntoView({behavior: 'smooth'});
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }

}