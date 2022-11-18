import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<any> = new Subject();

    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private dataService: DataService,
    ) {}


    public ngOnInit(): void {
        this.dataService.currentUser$.next(null);
        this.ngOnInitForm();
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        })
    }

    public submit(): void {
        this.authService.login(this.formGroup.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.dataService.currentUser$.next(res);
                if (res.userDto.role === 'USER') {
                    this.router.navigate(['stadium']);
                }

                if (res.userDto.role === 'OWNER_STADIUM') {
                    this.router.navigate(['my-stadium']);
                }                
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}