import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    spinner = new BehaviorSubject(false);
    spinner$ = this.spinner.asObservable();

    constructor() {}

    isLoading(loading: boolean): void {
        this.spinner.next(loading);
    }
}