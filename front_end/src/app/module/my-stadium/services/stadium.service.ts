import { AvailableStadiumRequest } from './../../booking/interfaces/stadium.interface';
import { RequestPagination, ResponsePagination } from './../../../core/interfaces/paginator.interface';
import { ToastService } from 'src/app/core/services/toast.service';
import { StadiumResponse } from './../interfaces/stadium.interface';
import { map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { AvailableStadium, Stadium, StadiumImage } from '../../booking/interfaces/stadium.interface';
import { Time } from '../../booking/interfaces/time.interface';

@Injectable({
    providedIn: 'root'
})
export class StadiumService {

    private url: string = `${environment.apiUrl}/stadiums`;
    private urlStadiumDetail: string = `${environment.apiUrl}/stadium-detail`

    constructor(
        private http: HttpClient,
        private toastService: ToastService,
        private spinnerService: SpinnerService
    ) {}

    public createStadium(data): Observable<StadiumResponse> {
        this.spinnerService.show();
        return this.http.post<StadiumResponse>(this.url, data)
            .pipe(tap({
                next: response => {
                    this.spinnerService.hide();
                    this.toastService.success('Tạo sân bóng thành công');
                },
                error: error => {
                    this.spinnerService.hide();
                }
            }))
    }

    public updateStadium(stadiumId: string, data): Observable<StadiumResponse> {
        this.spinnerService.show();
        return this.http.post<StadiumResponse>(`${this.url}/${stadiumId}`, data)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                    this.toastService.success('Cập nhật thành công');
                })
            )
    }

    public searchStadium(formSearch: RequestPagination<any>): Observable<ResponsePagination<Stadium[]>> {
        this.spinnerService.show();
        return this.http.post<ResponsePagination<Stadium[]>>(`${this.url}/search-stadium`, formSearch)
            .pipe(
                tap({
                    next: res => {
                        this.spinnerService.hide();
                    },
                    error: error => {
                        this.spinnerService.hide();
                    }
                })
            )
    }

    public getStadiumByProvinceId(provinceId: number): Observable<Stadium[]> {
        return this.searchStadium({
            page: null,
            pageSize: null,
            data: {
                provinceId: provinceId
            }
        }).pipe(map(res => res.data));
    }

    public getStadiumById(stadiumId: string): Observable<Stadium> {
        this.spinnerService.show();
        return this.http.get<Stadium>(`${this.url}/${stadiumId}`)
            .pipe(
                tap({
                    next: res => {
                        this.spinnerService.hide();
                    },
                    error: error => {
                        this.spinnerService.hide();
                        this.toastService.error(error?.error?.message);
                    }
                })
            )
    }

    public getMineStadium(formSearch: RequestPagination<any>): Observable<ResponsePagination<Stadium[]>> {
        this.spinnerService.show();
        return this.http.post<ResponsePagination<Stadium[]>>(`${this.url}/mine`, formSearch)
            .pipe(tap(res => {
                this.spinnerService.hide();
            }))
    }

    public getStadiumDetail(stadiumId: string): Observable<Time[]> {
        return this.http.get<Time[]>(`${this.urlStadiumDetail}/${stadiumId}`);
    }

    public getAvailableStadium(availableRequest: AvailableStadiumRequest): Observable<AvailableStadium[]> {
        return this.http.post<AvailableStadium[]>(`${this.url}/available-stadium`, availableRequest);
    }

    public deleteStadium(stadiumId: string): Observable<any> {
        this.spinnerService.show();
        return this.http.delete<any>(`${this.url}/${stadiumId}`)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                    this.toastService.success('Xóa SVĐ thành công');
                })
            )
    }
}