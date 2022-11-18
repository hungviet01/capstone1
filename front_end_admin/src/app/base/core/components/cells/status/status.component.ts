import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'app-status-cell',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements ICellRendererAngularComp {

    public value: string;
    public color: string;
    public background: string;

    agInit(params): void {
        const { values, colors, backgrounds } = params.colDef;
        const { status } = params.data;
        this.value = values[status];
        this.color = colors[status];
        this.background = backgrounds[status];
    }

    refresh(params: ICellRendererParams): boolean {
        return true;
    }
}