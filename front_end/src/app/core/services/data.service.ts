import { Feedback } from './../interfaces/feedback.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from './../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { District, Province } from '../interfaces/address.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public url = environment.apiUrl

    public activeAccount$: BehaviorSubject<string> = new BehaviorSubject(null);
    public currentUser$: BehaviorSubject<UserResponse> = new BehaviorSubject(null);
    public menuClose$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public clear$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public reloadRequestStadium$: BehaviorSubject<boolean> = new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    public getProvince(): Observable<Province[]> {
        return this.http.get<Province[]>(`${this.url}/provinces`);
    }

    public getDistrict(provinceId: number): Observable<District[]> {
        return this.http.get<District[]>(`${this.url}/districts/${provinceId}`);
    }

    public logout(): void {
        this.currentUser$.next(null);
        this.router.navigate(['/auth', 'login'])
    }

    public sendFeedback(feedback: Feedback): Observable<any> {
        return this.http.post(`${this.url}/feedbacks`, feedback);
    }
}