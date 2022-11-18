import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ACTION_ACCEPT, ACTION_CLOSE } from "src/app/base/_helpers/constant";
import { ConfirmModel } from "../../models/confirm.model";

@Component({
    selector: 'app-confirm',
    templateUrl: './popup-confirm.component.html',
    styleUrls: ['./popup-confirm.component.scss']
})
export class ConfirmComponent implements OnInit {


    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private matDialogRef: MatDialogRef<ConfirmComponent>,
    ) {}

    public ngOnInit(): void {
    }

    public doClose(): void {
        this.matDialogRef.close(ACTION_CLOSE);
    }

    public doAccept(): void {
        this.matDialogRef.close(ACTION_ACCEPT);
    }
}