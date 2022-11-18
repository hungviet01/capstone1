import { MyCartContainer } from './../../containers/my-cart/my-cart.container';
import { filter } from 'rxjs';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/core/components/_confirm/_confirm.component';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-action-cart',
    templateUrl: './action-cart.component.html',
    styleUrls: ['./action-cart.component.scss']
})
export class ActionCartComponent implements ICellRendererAngularComp {

    private param: ICellRendererParams<any, any>;

    constructor(
        private ngbModal: NgbModal,
        private cartService: CartService
    ) {}

    public agInit(params: ICellRendererParams<any, any>): void {
        this.param = params;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public deleteCart(): void {
        const ref = this.ngbModal.open(ConfirmComponent, {
            centered: true,
            animation: true
        });
        ref.componentInstance.content = {
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn xóa?'
        };

        ref.closed.pipe(filter(res => res)).subscribe(res => {
            this.cartService.deleteCart(this.param.data.id).subscribe(res => {
                const container = this.param.context as MyCartContainer;
                container.ngOnSearch(null);
            })
        })
    }

}