import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, TemplateRef } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-action-comment',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent implements ICellRendererAngularComp {

    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private matDialog: MatDialog,
    ) {}

    public agInit(params: ICellRendererParams): void {
        const { data } = params;
        this.formGroup = this.fb.group({
            fullName: [data.fullName],
            phone: [data.phone],
            email: [data.email],
            content: [data.content]
        })
        this.formGroup.disable();
    }

    public refresh(params: ICellRendererParams): boolean {
        return true;
    }

    public openForm(formTemplate: TemplateRef<any>): void {
        this.matDialog.open(formTemplate, {
            width: '500px'
        })
    }
}