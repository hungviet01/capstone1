import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from 'src/app/core/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();

    public formGroup: FormGroup;
    private username: string;

    constructor(
        private dataService: DataService,
        private router: Router,
        private fb: FormBuilder,
        private toastService: ToastService,
        private authService: AuthService
    ) {}

    public ngOnInit(): void {
        this.username = this.dataService.activeAccount$.getValue();
        if (!this.username) {
            this.router.navigate(['/auth', 'login']);
            return;
        }
        this.ngOnInitForm();

    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            otp: [null, [Validators.required, Validators.maxLength(6)]]
        })
    }

    public submit(): void {
        if(this.formGroup.invalid) {
            this.toastService.error('Thông tin không hợp lệ');
            return;
        }
        this.authService.activeAccount(this.username, this.formGroup.get('otp').value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.router.navigate(['/auth', 'login']);
            })
    }

    public reSendMail(): void {
        this.authService.reSendMail(this.username)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe();
    }

    public ngOnDestroy(): void {
        this.dataService.activeAccount$.next(null);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}