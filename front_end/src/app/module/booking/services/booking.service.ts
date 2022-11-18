import { environment } from './../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { ToastService } from "src/app/core/services/toast.service";
import { Stadium } from "../interfaces/stadium.interface";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    public bookingResult$: BehaviorSubject<Stadium[]> = new BehaviorSubject(null);

    private url: string = `${environment.apiUrl}/requests`

    constructor(
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private http: HttpClient,
    ) {}

    public sendChallengeRequest(parentId: number): Observable<any> {
        this.spinnerService.show();
        return this.http.post<any>(`${this.url}/create-challenge-request`, {
            parentId: parentId
        }).pipe(
            tap(res => {
                this.spinnerService.hide();
                this.toastService.success('Yêu cầu thành công');
            })
        )
    }
}