import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { SpinnerService } from "./spinner.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private spinnerService: SpinnerService,
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.authService.currentUser$.getValue()?.token;
        const request = req.clone({
            setHeaders: {
                'Authorization': `${jwt && 'Bearer '+jwt}`,
            }
        })

        return next.handle(request).pipe(
            tap(res => {
            }),
            catchError((error) => {
                if (error.status === 403 || error.status === 401) {
                    this.router.navigate(['auth/login'])
                }
                return throwError(() => error);
            })
        );
    }

}