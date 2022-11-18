import { Product } from './../../interfaces/product.interface';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {

    @Input() product: Product;

    constructor(
        private router: Router
    ) {}

    public ngOnInit(): void {
        
    }

    public navigateToDetail(productId: string): void {
        this.router.navigate(['/shop', 'product', productId]);
    }

    public ngOnDestroy(): void {
        
    }
}