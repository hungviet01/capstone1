import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from '../interfaces/category.interface';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private url: string = `${environment.apiUrl}/categories`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) {}

    public getCategoryAndProduct(): Observable<Category[]> {
        this.spinnerService.show();
        return this.http.get<Category[]>(`${this.url}/products`);
    }

    public getCategory(): Observable<Category[]> {
        this.spinnerService.show();
        return this.http.get<Category[]>(`${this.url}`);
    }
}