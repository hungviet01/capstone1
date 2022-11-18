import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { STATUS } from "src/app/base/_helpers/constant";
import { CategoryModel } from "src/app/page/category/models/category.model";
import { FormSearchProductModel } from "../../models/form-search-product.model";

@Component({
    selector: 'app-form-search-product',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {

    @Input() categoryList: CategoryModel[];
    @Output() search: EventEmitter<FormSearchProductModel> = new EventEmitter();

    formGroup: FormGroup;
    statusList: StatusModel[] = STATUS;

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.submit();
    }

    initForm(): void {
        this.formGroup = this.fb.group({
            name: [null],
            categoryId: [null],
            status: [null]
        })
    }

    submit(): void {
        this.search.emit(this.formGroup.value)
    }
}