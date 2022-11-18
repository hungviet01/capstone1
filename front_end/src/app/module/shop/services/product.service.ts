import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from '../interfaces/product.interface';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private url: string = `${environment.apiUrl}/products`
    private urlProductImage: string = `${environment.apiUrl}/product-image`
    private urlProductSize: string = `${environment.apiUrl}/sizes`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) {}

    public findById(productId: string): Observable<Product> {
        this.spinnerService.show();
        return this.http.get<Product>(`${this.url}/${productId}`)
    }

    public getProductImage(productId: string): Observable<any> {
        return this.http.get(`${this.urlProductImage}/product/${productId}`);
    }

    public getProductSize(productId: string): Observable<any> {
        return this.http.get(`${this.urlProductSize}/product/${productId}`);
    }

    public getProduct(categoryId: number): Observable<any> {
        return this.http.get(`${this.url}/category/${categoryId}`);
    }
}