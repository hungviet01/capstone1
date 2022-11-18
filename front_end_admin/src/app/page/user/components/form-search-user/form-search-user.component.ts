import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { STATUS } from "src/app/base/_helpers/constant";
import { UserModel } from "../../models/user.model";

@Component({
    selector: 'app-form-search-user',
    templateUrl: './form-search-user.component.html',
    styleUrls: ['./form-search-user.component.scss']
})
export class FormSearchUserComponent implements OnInit {

    @Output() search: EventEmitter<UserModel> = new EventEmitter();

    public formGroup: FormGroup;
    public _status: StatusModel[] = [
        {
            id: 0,
            label: 'Khóa'
        },
        {
            id: 1,
            label: 'Mở khóa'
        }
    ];

    public roles = [
        {
            id: 'USER',
            label: 'Người dùng'
        },
        {
            id: 'OWNER_STADIUM',
            label: 'Chủ sân'
        }
    ]

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.submit();
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            username: [null],
            status: [null],
            role: [null],
        });
    }

    public submit(): void {
        this.search.emit(this.formGroup.value);
    }
}