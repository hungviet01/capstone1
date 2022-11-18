import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subscription, take, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ResponseService } from '../../../base/core/models/response.model';
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { ToastrService } from "ngx-toastr";
import { FormSearchProductModel } from "../models/form-search-product.model";
import { SearchModel, ResponseServiceModel } from "src/app/base/core/models/search.model";
import { ProductModel } from "../models/product.model";
import { SizeModel } from "../models/size.model";
import { ProductImageModel } from "../models/product-image.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
    ) { }

    public getAll(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(`${environment.API_GATEWAY}/products`);
    }

    public doSearch(searchData: SearchModel<FormSearchProductModel>): Observable<ResponseServiceModel<ProductModel>> {
        this.spinnerService.isLoading(true);
        return this.http
            .post<ResponseServiceModel<ProductModel>>(`${environment.API_GATEWAY2}/products/search-product`, searchData)
            .pipe(
                tap({
                    next: res => {
                        this.spinnerService.isLoading(false);
                    },
                    error: error => {
                        this.toastrService.error(error?.error?.message);
                        this.spinnerService.isLoading(false);
                    }
                })
            )
    }

    public save(product: FormData): Observable<ResponseService<void>> {
        this.spinnerService.isLoading(true);
        return this.http
            .post<ResponseService<void>>(`${environment.API_GATEWAY}/products`, product)
            .pipe(
                tap({
                    next: res => {
                        this.toastrService.success(res.message);
                        this.spinnerService.isLoading(false);
                    },
                    error: error => {
                        this.toastrService.error(error?.error.message);
                        this.spinnerService.isLoading(false);
                    }
                })
            )

    }

    public getSizeByProduct(productId): Observable<SizeModel[]> {
        return this.http.get<SizeModel[]>(`${environment.API_GATEWAY2}/sizes/product/${productId}`)
    }

    public getImages(productId): Observable<ProductImageModel[]> {
        return this.http.get<ProductImageModel[]>(`${environment.API_GATEWAY2}/product-image/product/${productId}`)       
    }

    public deleteProduct(productId): Observable<ResponseService<void>> {
        this.spinnerService.isLoading(true);
        return this.http.delete<ResponseService<void>>(`${environment.API_GATEWAY}/products`, {
            params: {
                productId: productId,
            }
        }).pipe(
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