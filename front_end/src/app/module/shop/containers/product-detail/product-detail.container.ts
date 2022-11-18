import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Product } from './../../interfaces/product.interface';
import { ConfirmShoppingComponent } from './../../components/confirm-shopping/confirm-shopping.component';
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from '../../services/cart.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductService } from '../../services/product.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-detail-product',
    templateUrl: './product-detail.container.html',
    styleUrls: ['./product-detail.container.scss']
})
export class ProductDetailContainer implements OnInit {

    public product: Product
    public productImage: any[];
    public productSize$: Observable<any>;
    public product$: Observable<any>
    public currentImageShow: string;
    public showImageIndex: number = 0;

    constructor(
        private ngbModal: NgbModal,
        private cartService: CartService,
        private toastService: ToastService,
        private router: ActivatedRoute,
        private productService: ProductService,
        private dataService: DataService,
        private _router: Router
    ) {}

    public ngOnInit(): void {
        this.router.params.subscribe(param => {
            this.productService.findById(param.productId)
                .subscribe(res => {
                    this.product = res;
                    this.currentImageShow = this.product.avatar;
                    this.product$ = this.productService.getProduct(this.product.categoryId);
                });
            this.productService.getProductImage(param.productId)
                .subscribe(res => {
                    this.productImage = res;
                })
            this.productSize$ = this.productService.getProductSize(param.productId);
        })
    }

    public buyProduct(): void {
        const ref = this.ngbModal.open(ConfirmShoppingComponent, {
            centered: true,
            animation: true,
        });

        ref.componentInstance.maxQuantity = this.product.quantity;
        ref.componentInstance.productSize$ = this.productSize$;
        ref.componentInstance.price = this.product.price;

        ref.closed
        .pipe(filter(res => res))
        .subscribe(res => {
            const currentUser = this.dataService.currentUser$.getValue();
            if (!currentUser) {
                this.toastService.error('Bạn phải đăng nhập trước khi mua hàng');
                this._router.navigate(['/auth', 'login']);
                return;
            }
            this.cartService.addToCart({
                ...res,
                productId: this.product.id
            }).subscribe(res => {
                this.toastService.success('Thêm vào giỏ hàng thành công');
            })
        })
    }
    
    public nextImage(): void {
        if (this.showImageIndex == (this.productImage?.length - 3)) return;
        this.showImageIndex++;
    }

    public previousImage(): void {
        if (this.showImageIndex == 0) return;
        this.showImageIndex--;
    }
}