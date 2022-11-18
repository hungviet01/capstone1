import { FindingRequest } from './../interfaces/finding-request.interface';
import { ResponsePagination } from './../../../core/interfaces/paginator.interface';
import { PendingRequest, Challenge } from './../interfaces/request.interface';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Request } from '../interfaces/request.interface';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Battle } from '../../booking/interfaces/battle.interface';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private url: string = `${environment.apiUrl}/requests`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
    ) {}

    public requestStadium(request: Request): Observable<Request> {
        this.spinnerService.show();
        return this.http.post<Request>(this.url, request)
            .pipe(
                tap({
                    next: res => {
                        this.spinnerService.hide();
                        this.toastService.success('Đăng ký thành công');
                    }
                })
            )
    }

    public getStadiumRequest(data): Observable<ResponsePagination<PendingRequest[]>> {
        return this.http.post<ResponsePagination<PendingRequest[]>>(`${this.url}/search-request`, data);
    }

    public approveRequest(request: PendingRequest): Observable<any> {
        this.spinnerService.show();
        return this.http.post(`${this.url}/approve`, request)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                })
            );
    }

    public rejectRequest(request: PendingRequest): Observable<any> {
        this.spinnerService.show();
        return this.http.post(`${this.url}/reject`, request)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                })
            );
    }

    public getCompetitorStadium(stadiumId: string): Observable<Battle[]> {
        this.spinnerService.show();
        return this.http.get<Battle[]>(`${this.url}/competitor/${stadiumId}`)
            .pipe(tap(res => {
                this.spinnerService.hide();
            }))
    }

    public getFindingRequest(formSearch): Observable<ResponsePagination<FindingRequest[]>> {
        this.spinnerService.show();
        return this.http.post<ResponsePagination<FindingRequest[]>>(`${this.url}/finding-request`, formSearch)
            .pipe(
                tap(res => this.spinnerService.hide())
            )
    }

    public getFoundRequest(formSearch): Observable<ResponsePagination<Request[]>> {
        this.spinnerService.show();
        return this.http.post<ResponsePagination<Request[]>>(`${this.url}/found-request`, formSearch)
            .pipe(
                tap(res => this.spinnerService.hide())
            )
    }

    public getChallengeRequest(parentId: number): Observable<Challenge[]> {
        return this.http.get<Challenge[]>(`${this.url}/challenge-request/${parentId}`);
    }

    public rejectChallengeRequest(requestDetailId: number): Observable<any> {
        this.spinnerService.show();
        return this.http.get(`${this.url}/reject-competitor-request/${requestDetailId}`)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                    this.toastService.success('Từ chối thành công')
                })
            )
    }

    public approveChallengeRequest(requestDetailId: number): Observable<any> {
        this.spinnerService.show();
        return this.http.get(`${this.url}/approve-competitor-request/${requestDetailId}`)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                    this.toastService.success('Chấp nhận thành công')
                })
            )
    }
}