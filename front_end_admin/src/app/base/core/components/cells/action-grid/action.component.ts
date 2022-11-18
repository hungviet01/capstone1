import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'app-action-grid',
    templateUrl: './action-grid.component.html',
    styleUrls: ['./action-grid.component.scss']
})
export class ActionGridComponent implements ICellRendererAngularComp {

    params;

    refresh(params: ICellRendererParams): boolean {
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    onDelete(): void {
        this.params.onDelete(this.params.data);
    }

    onEdit(): void {
        this.params.onEdit(this.params.data);
    }
}