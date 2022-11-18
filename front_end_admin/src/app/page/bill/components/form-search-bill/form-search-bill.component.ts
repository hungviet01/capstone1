import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BillModel } from "../../models/bill.model";

@Component({
    selector: 'app-form-search-bill',
    templateUrl: './form-search-bill.component.html',
    styleUrls: ['./form-search-bill.component.scss']
})
export class FormSearchBillComponent implements OnInit {

    public formGroup: FormGroup;
    @Output() public search: EventEmitter<BillModel> = new EventEmitter();

    status = [
        {
            id: 0,
            label: 'Chờ duyệt'
        },
        {
            id: 1,
            label: 'Đã duyệt'
        },
        {
            id: 2,
            label: 'Từ chối'
        }
    ]

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.doSearch();
    }

    public initForm(): void {
        this.formGroup = this.fb.group({
            id: [null],
            createdDate: [null],
            status: [null],
        })
    }

    public doSearch(): void {
        this.search.emit(this.formGroup.value);
    }
}