import { prepareSubmitForm } from 'src/app/base/helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './_feedback.component.html',
    styleUrls: ['./_feedback.component.scss']
})
export class FeedbackComponent implements OnInit{

    public formGroup: FormGroup;

    constructor(
        private activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private spinnerService: SpinnerService,
        private dataService: DataService,
        private toastService: ToastService,
    ) {}

    public ngOnInit(): void {
        this.formGroup = this.fb.group({
            fullName: [null, [Validators.required]],
            phone: [null, [Validators.required, Validators.pattern('^(0|\\+84)[0-9]{9}')]],
            email: [null, [Validators.required, Validators.email]],
            content: [null, [Validators.required]]
        })
    }

    public submit(): void {
        prepareSubmitForm(this.formGroup);
        if(this.formGroup.invalid) {
            return;
        }
        this.spinnerService.show();
        this.dataService.sendFeedback(this.formGroup.value).subscribe(res => {
            this.spinnerService.hide();
            this.toastService.success('Gửi phản hồi thành công');
            this.close();
        })
    }

    public close(): void {
        this.activeModal.close();
    }
}