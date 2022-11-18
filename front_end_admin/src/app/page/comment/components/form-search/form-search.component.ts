import { FeedbackModel } from '../../models/feeback.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-form-search-comment',
    templateUrl: './form-search-comment.component.html',
    styleUrls: ['./form-search-comment.component.scss']
})
export class FormSearchCommentComponent implements OnInit {

    public formGroup: FormGroup;
    @Output() search: EventEmitter<FeedbackModel> = new EventEmitter();

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
            createdDate: [null]
        })
    }

    public submit(): void {
        this.search.emit(this.formGroup.value);
    }
}