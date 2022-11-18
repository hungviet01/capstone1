import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { StadiumImage } from '../../booking/interfaces/stadium.interface';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Injectable({
    providedIn: 'root'
})
export class StadiumImageService {

    private url: string = `${environment.apiUrl}/stadium-image`

    constructor(
        private http: HttpClient,
    ) {}

    public getStadiumImage(stadiumId: string): Observable<StadiumImage[]> {
        return this.http.get<StadiumImage[]>(`${this.url}/${stadiumId}`)
    }
}