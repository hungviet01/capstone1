import { Role } from './../../../base/constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { AuthService } from '../service/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastService: ToastService,
        private router: Router,
        private dataService: DataService,
    ) {}

    public ngOnInit(): void {
        this.ngOnInitForm();
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            fullName: [null, [Validators.required]],
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            email: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            role: [Role.USER, [Validators.required]]
        })
    }

    public get formControl() {
        return this.formGroup?.controls;
    }

    public isErrorControl(formControlName: string): boolean {
        if (!this.formControl) return false;
        return (this.formControl[formControlName].dirty || this.formControl[formControlName].touched) && this.formControl[formControlName].invalid;
    }

    public submit(): void {
        if (this.formGroup.invalid) {
            this.toastService.error('Thông tin không hợp lệ')
            return;
        }
        this.authService.reigsUser(this.formGroup.value)
            .subscribe(res => {
                this.dataService.activeAccount$.next(this.formControl['username'].value);
                this.router.navigate(['/auth', 'otp']);
            })
    }
}