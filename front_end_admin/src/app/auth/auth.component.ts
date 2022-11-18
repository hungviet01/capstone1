import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { recursive } from "../base/_helpers/helper";
import { AuthService } from "./services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

    $unsubscribe = new Subject();
    
    formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastrService: ToastrService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        })
    }

    get getControl() {
        return this.formGroup.controls;
    }

    submit(): void {
        recursive(this.formGroup);

        if (this.formGroup.invalid) {
            return;
        }
        this.authService.login(this.formGroup.value)
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe(res => {
                if(res.userDto.role != 'ADMIN') {
                    this.toastrService.error('Tài khoản không có quyền');
                    return;
                }
                this.toastrService.success('Đăng nhập thành công');
                this.router.navigate(['product']);
            })
        
    }
    
    ngOnDestroy(): void {
        this.$unsubscribe && this.$unsubscribe.unsubscribe();
    }
}