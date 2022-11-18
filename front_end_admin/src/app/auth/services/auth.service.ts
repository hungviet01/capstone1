import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginResponse } from "../models/login-response.model";
import { ToastrService } from "ngx-toastr";
import { SpinnerService } from "src/app/base/core/services/spinner.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    API: string = `${environment.API_GATEWAY}`

    public currentUser$: BehaviorSubject<LoginResponse> = new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private toastrService: ToastrService,
        private spinnerService: SpinnerService,
        private router: Router
    ) {}

    login(user: LoginModel): Observable<LoginResponse> {
        this.spinnerService.isLoading(true);
        return this.http
            .post<LoginResponse>(`${environment.API_GATEWAY2}/authenticate`, user)
            .pipe(
                tap({
                    next: res => {
                        this.currentUser$.next(res);
                        this.spinnerService.isLoading(false);
                    },
                    error: error => {
                        this.toastrService.error(error?.error?.message);
                        this.spinnerService.isLoading(false);
                    }
                })
            );
    }
    logout(): void {
        this.currentUser$.next(null);
        this.router.navigate(['/auth','login'])
    }
}