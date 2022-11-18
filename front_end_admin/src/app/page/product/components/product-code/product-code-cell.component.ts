import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { CreateUpdateProductComponent } from "../create-update-product/create-update-product.component";

@Component({
    selector: 'app-product-code-cell',
    templateUrl: './product-code-cell.component.html',
    styleUrls: ['./product-code-cell.component.scss']
})
export class ProductCodeCellComponent implements ICellRendererAngularComp {
   
    params: ICellRendererParams;

    constructor(
        private matDialog: MatDialog,
    ) {}

    refresh(params: ICellRendererParams): boolean {
        return true;
    }
    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    openProductDetail(): void {
        this.matDialog.open(CreateUpdateProductComponent, {
            width: '1000px',
            data: {
                product: {
                    ...this.params.data,
                    disabled: true
                },
                categoryList: this.params.context.parent.categoryList
            }
            
        })
    }

}