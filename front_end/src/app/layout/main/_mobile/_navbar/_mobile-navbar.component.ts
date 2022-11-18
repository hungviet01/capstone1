import { filter, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { NgbActiveOffcanvas } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-mobile-navbar',
    templateUrl: './_mobile-navbar.component.html',
    styleUrls: ['./_mobile-navbar.component.scss']
})
export class MobileNavbarComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    constructor(
        public ngbActiveCanvas: NgbActiveOffcanvas,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.subscription = this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe(res => this.ngbActiveCanvas.close())
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}