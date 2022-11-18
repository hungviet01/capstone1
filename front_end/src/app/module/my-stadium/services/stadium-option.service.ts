import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StadiumOption } from '../../booking/interfaces/stadium.interface';

@Injectable({
    providedIn: 'root'
})
export class StadiumOptionService {

    private url: string = `${environment.apiUrl}/stadium-option`;

    constructor(
        private http: HttpClient,
    ) {}

    public getStadiumOption(stadiumId: string): Observable<StadiumOption[]> {
        return this.http.get<StadiumOption[]>(`${this.url}/${stadiumId}`);
    }
}