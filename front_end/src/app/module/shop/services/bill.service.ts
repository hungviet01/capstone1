import { Observable } from 'rxjs';
import { ResponsePagination, RequestPagination } from './../../../core/interfaces/paginator.interface';
import { environment } from './../../../../environments/environment';
import { Bill, BillDetail } from './../interfaces/bill.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Injectable({
    providedIn: 'root'
})
export class BillService {

    private url: string = `${environment.apiUrl}/bills`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) {}

    public getMyBill(data: RequestPagination<any>): Observable<ResponsePagination<Bill[]>> {
        this.spinnerService.show();
        return this.http.post<ResponsePagination<Bill[]>>(`${this.url}/mine`, data);
    }

    public getBillDetail(billId: string): Observable<BillDetail[]> {
        this.spinnerService.show();
        return this.http.get<BillDetail[]>(`${this.url}/detail/${billId}`)
    }
}