import { User, UserDTO, UserRequest } from './../../../core/interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private dataService: DataService,
        private router: Router,
    ) {}

    public login(user: UserRequest): Observable<UserResponse> {
        this.spinnerService.show();
        return this.http.post<UserResponse>(`${this.url}/authenticate`, user)
            .pipe(
                tap({
                    next: res => {
                        this.toastService.success('Đăng nhập thành công');
                        this.spinnerService.hide();
                    },
                    error: error => {
                        if (error.status == 400) {
                            this.dataService.activeAccount$.next(user.username);
                            this.router.navigate(['/auth', 'otp']);
                        }
                    }
                })
            )
    }

    public reigsUser(user: User): Observable<UserDTO> {
        this.spinnerService.show();
        return this.http.post<UserDTO>(`${this.url}/users`, user)
            .pipe(
                tap({
                    next: res => {
                        this.toastService.success('Đã gửi mã kích hoạt đến ' + user.email);
                        this.spinnerService.hide();
                    },
                    error: error => {
                        this.toastService.error(error?.error?.message || 'Đăng ký thất bại')
                        this.spinnerService.hide();
                    }
                })
            )
    }

    public activeAccount(username: string, otp: string): Observable<any> {
        this.spinnerService.show();
        return this.http.post(`${this.url}/users/active`, {
            username: username,
            otpCode: otp
        }).pipe(
            tap({
                next: res => {
                    this.toastService.success('Kích hoạt thành công');
                    this.spinnerService.hide();
                },
                error: error => {
                    this.toastService.error('Kích hoạt thất bại');
                    this.spinnerService.hide();
                }
            })
        );
    }

    public reSendMail(username: string): Observable<any> {
        this.spinnerService.show();
        return this.http.post<User>(`${this.url}/users/re-send-mail`, {
            username: username
        }).pipe(
            tap({
                next: res => {
                    this.toastService.success('Đã gửi mã đến: ' +res.email);
                    this.spinnerService.hide();
                },
                error: error => {
                    this.toastService.error(error?.error?.message || 'Gửi mail thất bại');
                    this.spinnerService.hide();
                }
            })
        )
    }
}