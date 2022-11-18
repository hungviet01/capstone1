import { ResponseServiceModel } from './../../../base/core/models/search.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';
import { FeedbackModel } from '../models/feeback.model';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/base/core/services/spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
    ) {}

    public search(comment): Observable<ResponseServiceModel<FeedbackModel>> {
        return this.handleResponse<ResponseServiceModel<FeedbackModel>>(
            this.http.post<ResponseServiceModel<FeedbackModel>>(`${environment.API_GATEWAY}/feedbacks/search-feedback`, comment)
        );
    }

    private handleResponse<T>(response: Observable<T>): Observable<T> {
        this.spinnerService.isLoading(true);
        return response?.pipe(
            tap({
                next: (res: T | any) => {
                    res.message && this.toastrService.success(res.message);
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