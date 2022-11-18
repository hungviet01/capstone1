import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { STATUS } from "src/app/base/_helpers/constant";
import { recursive } from "src/app/base/_helpers/helper";
import { UserModel } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
    
    public _status: StatusModel[] = STATUS;
    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private matDialogRef: MatDialogRef<UpdateUserComponent>,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: UserModel,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.initData();
        this.getControl.username.disable();
    }

    public initForm(): void {
        this.formGroup = this.fb.group({
            username: [null],
            full_name: [null],
            birthday: [null],
            phone: [null],
            status: [null],
            address: [null]
        })
    }

    public initData(): void {
        this.formGroup.patchValue({
            ...this.data
        });
    }

    public submit(): void {
        recursive(this.formGroup);
        if (this.formGroup.invalid) return;
    }

    public closeDialog(): void {
        this.matDialogRef.close();
    }

    get getControl() {
        return this.formGroup.controls;
    }
}