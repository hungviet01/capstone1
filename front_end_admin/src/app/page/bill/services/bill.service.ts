import { BillDetailModel } from './../models/bill-detail.model';
import { environment } from './../../../../environments/environment.prod';
import { ResponseServiceModel } from './../../../base/core/models/search.model';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './../../../base/core/services/spinner.service';
import { Observable } from 'rxjs';
import { BillModel } from './../models/bill.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { SearchModel } from 'src/app/base/core/models/search.model';

@Injectable({
    providedIn: 'root'
})
export class BillService {

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
    ) { }

    public search(bill: SearchModel<BillModel>): Observable<ResponseServiceModel<BillModel>> {
        return this.handleResponse<ResponseServiceModel<BillModel>>(
            this.http.post<ResponseServiceModel<BillModel>>(`${environment.API_GATEWAY}/bills/search-bill`, bill)
        )
    }

    public approveBill(billId: string): Observable<ResponseServiceModel<void>> {
        return this.handleResponse<ResponseServiceModel<void>> (
            this.http.get<ResponseServiceModel<void>>(`${environment.API_GATEWAY}/bills/approve/${billId}`)
        );
    }

    public cancelBill(billId: string): Observable<ResponseServiceModel<void>> {
        return this.handleResponse<ResponseServiceModel<void>> (
            this.http.get<ResponseServiceModel<void>>(`${environment.API_GATEWAY}/bills/reject/${billId}`)
        )
    }

    public getBillDetial(billId: string): Observable<BillDetailModel[]> {
        return this.handleResponse<BillDetailModel[]>(
            this.http.get<BillDetailModel[]>(`${environment.API_GATEWAY2}/bills/detail/${billId}`)
        );
    }

    private handleResponse<T>(response: Observable<T>): Observable<T> {
        this.spinnerService.isLoading(true)
        return response?.pipe(
            tap({
                next: (res: T | any) => {
                    res.message && this.toastrService.success(res.message);
                    this.spinnerService.isLoading(false);
                },
                error: error => {
                    this.toastrService.error(error?.error?.message);
                    this.spinnerService.isLoading(false);
                },
                complete: () => {
                    this.spinnerService.isLoading(false);
                }
            })
        )
    }
}