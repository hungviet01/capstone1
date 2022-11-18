import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { STATUS } from "src/app/base/_helpers/constant";
import { recursive } from "src/app/base/_helpers/helper";
import { CategoryModel } from "../../models/category.model";
import { CategoryService } from "../../services/category.service";

@Component({
    selector: 'app-create-update-category',
    templateUrl: './create-update-category.component.html',
    styleUrls: ['./create-update-category.component.scss']
})
export class CreateUpdateCategoryComponent implements OnInit {

    public formGroup: FormGroup;
    public status: StatusModel[] = STATUS;

    constructor(
        private fb: FormBuilder,
        private matDialogRef: MatDialogRef<CreateUpdateCategoryComponent>,
        private categoryService: CategoryService,
        @Inject(MAT_DIALOG_DATA) public data: CategoryModel,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    private initForm() {
        this.formGroup = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
        })
    }

    private initData(): void {
        this.formGroup.patchValue(this.data);
    }

    public onClose(event): void {
        this.matDialogRef.close(event);
    }

    public submit(): void {
        recursive(this.formGroup);
        if (this.formGroup.invalid) return;
        this.categoryService
            .saveCategory(this.formGroup.value)
            .subscribe(res => {
                this.matDialogRef.close({event: 'save'})
            })
    }

    public get getControl() {
        return this.formGroup.controls;
    }
}