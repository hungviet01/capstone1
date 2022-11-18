import { filter } from 'rxjs';
import { FeedbackComponent } from './../_feedback/_feedback.component';
import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/core/components/_confirm/_confirm.component';
import { DataService } from 'src/app/core/services/data.service';
import { MobileNavbarComponent } from '../_mobile/_navbar/_mobile-navbar.component';
import { Role } from 'src/app/base/constant';

@Component({
    selector: 'app-header2',
    templateUrl: './_header2.component.html',
    styleUrls: ['./_header2.component.scss'],
})
export class Header2Component implements OnInit {
    public isLoggedIn: boolean = false;
    public username: string;
    public homeUrl: string = '';

    constructor(
        private ngbOffCanvas: NgbOffcanvas,
        private dataService: DataService,
        private ngbModal: NgbModal,
    ) { }

    public ngOnInit(): void {
        this.dataService.currentUser$.subscribe(res => {
            this.isLoggedIn = res != null;
            this.homeUrl = 'stadium'
            if (this.isLoggedIn) {
                this.username = res.userDto.username;
                if (res.userDto.role == Role.OWNER_STADIUM) {
                    this.homeUrl = 'my-stadium'
                }
            } else {
                this.username = null;
            }
        })
    }

    public openFeedBackModal(): void {
        this.ngbModal.open(FeedbackComponent, {
            centered: true,
            animation: true
        });
    }

    public logout(): void {
        const ref = this.ngbModal.open(ConfirmComponent, {
            centered: true,
            animation: true
        })
        ref.componentInstance.content = {
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn đăng xuất?'
        };
        ref.closed
            .pipe(filter(res => res))
            .subscribe(res => this.dataService.logout())
    }

    public openMobileMenu(): void {
        this.ngbOffCanvas.open(MobileNavbarComponent);
    }
}
