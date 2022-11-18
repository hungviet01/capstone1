import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-quantity-action',
    templateUrl: './quantity-action.component.html',
    styleUrls: ['./quantity-action.component.scss']
})
export class QuantityActionComponent implements ICellRendererAngularComp, OnInit {
   
    @Input() maxQuantity: number;
    @Input() minQuantity: number;
    @Input() defaultValue: number;
    @Output() change: EventEmitter<number> = new EventEmitter();

    public value: number;
    public params: ICellRendererParams<any, any>;

    constructor(
        private cartService: CartService,
    ) {}

    public ngOnInit(): void {
        if (this.defaultValue) {
            this.value = this.defaultValue;
        }
    }

    public agInit(params: ICellRendererParams<any, any>): void {
        this.params = params;
        if (!this.value) {
            this.value = params.data.quantity;
        }
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public plus(): void {
        if (this.value == this.maxQuantity) return;
        this.value++;
        this.change.emit(this.value);
        this.refreshTotalCellGrid('PLUS');
    }

    public subtract(): void {
        if (this.value == this.minQuantity) return;
        this.value--;
        this.change.emit(this.value);
        this.params.data.quantity = this.value;
        this.refreshTotalCellGrid('SUBTRACT');
    }

    private refreshTotalCellGrid(action: 'PLUS' | 'SUBTRACT'): void {
        if (!this.params) return;
        const { id } = this.params.data
        var rowNode = this.params.api.getRowNode(id);
        const setData = () => {
            this.params.data.quantity = this.value;
            rowNode.setDataValue('total', this.value * this.params.data.price);
        }
        this.cartService[action.toLocaleLowerCase() + 'Quantity'](id).subscribe(setData);
    }

}