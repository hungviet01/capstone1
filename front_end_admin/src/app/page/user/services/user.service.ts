import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, tap } from "rxjs";
import { ResponseService } from "src/app/base/core/models/response.model";
import { SearchModel } from "src/app/base/core/models/search.model";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { environment } from "src/environments/environment";
import { ResponseSearchUser, UserModel } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
    ) {}

    public searchUser(search: SearchModel<UserModel>): Observable<ResponseSearchUser> {
        this.spinnerService.isLoading(true);
        return this.http
                    .post<ResponseSearchUser>(`${environment.API_GATEWAY}/users/search`, search)
                    .pipe(
                        tap({
                            next: res => this.spinnerService.isLoading(false),
                            error: error => {
                                this.toastrService.error(error?.error?.message);
                                this.spinnerService.isLoading(false);
                            }
                        })
                    );
    }

    public unlockUser(user: UserModel): Observable<ResponseService<UserModel>> {
        this.spinnerService.isLoading(true);
        return this.http
                    .get<ResponseService<UserModel>>(`${environment.API_GATEWAY}/users/unlock/${user.username}`)
                    .pipe(
                        tap({
                            next: res => {
                                this.spinnerService.isLoading(false);
                                this.toastrService.success(res.message);
                            },
                            error: error => {
                                this.spinnerService.isLoading(false);
                                this.toastrService.error(error?.error?.message);
                            }
                        })
                    )
    }

    public lockUser(username: string): Observable<ResponseService<void>> {
        return this.http
                    .get<ResponseService<void>>(`${environment.API_GATEWAY}/users/lock/${username}`)
                    .pipe(
                        tap({
                            next: res => {
                                this.toastrService.success(res.message);
                                this.spinnerService.isLoading(false);
                            },
                            error: error => {
                                this.toastrService.error(error?.error?.message);
                                this.spinnerService.isLoading(false);
                            }
                        })
                    )
    }
}