import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, tap } from "rxjs";
import { ResponseService } from "src/app/base/core/models/response.model";
import { ResponseServiceModel, SearchModel } from "src/app/base/core/models/search.model";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { environment } from "src/environments/environment";
import { CategoryModel, ResponseSearchCategory } from "../models/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient,
        private spinnserService: SpinnerService,
        private toastrService: ToastrService,
    ) {}

    public getCategoryNotPagination(): Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(`${environment.API_GATEWAY2}/categories`);
    }

    public searchCategoryAndPagination(search: SearchModel<CategoryModel>): Observable<ResponseSearchCategory> {
        this.spinnserService.isLoading(true);
        return this.http
                    .post<ResponseSearchCategory>(`${environment.API_GATEWAY}/categories/search-category`, search)
                    .pipe(
                        tap({
                            next: res => this.spinnserService.isLoading(false),
                            error: error => {
                                this.toastrService.error(error?.error?.message);
                                this.spinnserService.isLoading(false);
                            }
                        })
                    );
        
    }

    public saveCategory(category: CategoryModel): Observable<ResponseService<CategoryModel>> {
        this.spinnserService.isLoading(true);
        return this.http
                    .post<ResponseService<CategoryModel>>(`${environment.API_GATEWAY}/categories`, category)
                    .pipe(
                        tap({
                            next: res => {
                                this.toastrService.success(res.message);
                                this.spinnserService.isLoading(false);
                            },
                            error: error => {
                                this.toastrService.error(error?.error?.message);
                                this.spinnserService.isLoading(false);
                            }
                        })
                    )
    }
}