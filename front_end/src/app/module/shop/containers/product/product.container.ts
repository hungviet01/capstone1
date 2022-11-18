import { Observable } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';

@Component({
    selector: 'app-product-container',
    templateUrl: './product.container.html',
    styleUrls: ['./product.container.scss']
})
export class ProductContainer implements OnInit {

    public category$: Observable<Category[]>;

    constructor(
        private categoryService: CategoryService,
    ) {}

    public ngOnInit(): void {
        this.category$ = this.categoryService.getCategoryAndProduct();
    }
}