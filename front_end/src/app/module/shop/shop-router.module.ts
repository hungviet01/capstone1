import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { ProductContainer } from './containers/product/product.container';
import { ProductDetailContainer } from './containers/product-detail/product-detail.container';
import { MyCartContainer } from './containers/my-cart/my-cart.container';
import { MyBillContainer } from './containers/my-bill/my-bill.container';

const routes: Routes = [
    {
        path: 'product',
        component: ProductContainer
    },
    {
        path: 'my-cart',
        component: MyCartContainer,
    },
    {
        path: 'my-bill',
        component: MyBillContainer,
    },
    {
        path: 'product/:productId',
        component: ProductDetailContainer
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class ShopRouterModule {}