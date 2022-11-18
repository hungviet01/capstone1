import { OnDestroy } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main.layout.html',
    styleUrls: ['./main.layout.scss']
})
export class MainLayout implements OnInit, OnDestroy {
    
    private unsubscribe$: Subject<void> = new Subject();
    public isHomePage: boolean = false;
    public isShopPage: boolean = false;

    constructor(
        public router: Router,
    ) {}

    public ngOnInit(): void {
        this.isHomePage = this.router.url === '/stadium';
        this.isShopPage = this.router.url === '/shop/product';
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationStart),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(event => {
                const navigationStart = event as NavigationStart;
                this.isHomePage = navigationStart.url === '/stadium';
                this.isShopPage = navigationStart.url === '/shop/product';
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.next();
        this.unsubscribe$?.complete();
    }
}