import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { STATUS } from "src/app/base/_helpers/constant";
import { CategoryModel } from "../../models/category.model";

@Component({
    selector: 'app-form-search-category',
    templateUrl: './form-search-category.component.html',
    styleUrls: ['./form-search-category.component.scss']
})
export class FormSearchCategoryComponent implements OnInit {

    @Output() public search: EventEmitter<CategoryModel> = new EventEmitter();
    public formGroup: FormGroup;
    public _status: StatusModel[] = STATUS;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.submit();
    }

    public initForm(): void {
        this.formGroup = this.fb.group({
            name: [null],
            status: [null]
        })
    }

    public submit(): void {
        this.search.emit(this.formGroup.value);
    }
}