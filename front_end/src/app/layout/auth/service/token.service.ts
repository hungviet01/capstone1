import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";
import { DataService } from "src/app/core/services/data.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { ToastService } from "src/app/core/services/toast.service";

@Injectable({
    providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

    constructor(
        private dataService: DataService,
        private router: Router,
        private toastService: ToastService,
        private spinnerService: SpinnerService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.dataService.currentUser$?.getValue()?.token;
        const request = req.clone({
            setHeaders: {
                'Authorization': `${jwt && 'Bearer '+jwt}`,
            }
        })

        return next.handle(request).pipe(
            tap(res => {
                if (res instanceof HttpResponse ) {
                    this.spinnerService.hide();
                  }
            }),
            catchError((error) => {
                this.toastService.error(error.error?.message || 'Có lỗi xảy ra');
                this.spinnerService.hide();
                if (error.status === 403 || error.status === 401) {
                    this.router.navigate(['auth', 'login'])
                }
                return throwError(() => error);
            })
        );
    }
}