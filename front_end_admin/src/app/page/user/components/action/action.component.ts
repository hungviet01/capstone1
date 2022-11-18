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

    onLock(): void {
        this.params.onLock(this.params.data);
    }

    onUnlock(): void {
        this.params.onUnlock(this.params.data);
    }
}