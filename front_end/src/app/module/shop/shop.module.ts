import { ProductCardComponent } from './components/product-card/product-card.component';
import { NgModule } from "@angular/core";
import { ProductContainer } from "./containers/product/product.container";
import { ShopRouterModule } from "./shop-router.module";
import { CoreModule } from 'src/app/core/core.module';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductDetailContainer } from './containers/product-detail/product-detail.container';
import { ConfirmShoppingComponent } from './components/confirm-shopping/confirm-shopping.component';
import { MyCartContainer } from './containers/my-cart/my-cart.container';
import { QuantityActionComponent } from './components/quantity-action/quantity-action.component';
import { ConfirmPaymentComponent } from './components/confirm-payment/confirm-payment.component';
import { MyBillContainer } from './containers/my-bill/my-bill.container';
import { ActionCartComponent } from './components/action-cart/action-cart.component';
import { ActionBillComponent } from './components/action-bill/action-bill.component';

const imports = [
    CoreModule,
    CommonModule,
    ShopRouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
]

const declarations = [
    ProductContainer,
    ProductCardComponent,
    FormSearchComponent,
    ProductDetailContainer,
    ConfirmShoppingComponent,
    MyCartContainer,
    QuantityActionComponent,
    ConfirmPaymentComponent,
    MyBillContainer,
    ActionCartComponent,
    ActionBillComponent,
]

@NgModule({
    imports: imports,
    declarations: declarations,
    providers: [ CurrencyPipe ]
})
export class ShopModule {}