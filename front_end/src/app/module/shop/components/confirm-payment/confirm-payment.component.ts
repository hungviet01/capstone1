import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-confirm-payment',
    templateUrl: './confirm-payment.component.html',
    styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent implements OnInit {

    public formGroup: FormGroup;
    public totalBill: number;

    constructor(
        private fb: FormBuilder,
        public activeModal: NgbActiveModal,
        private dataService: DataService,
    ) {}

    public ngOnInit(): void {
        this.ngInitForm();
    }

    private ngInitForm(): void {
        this.formGroup = this.fb.group({
            fullName: [null, [Validators.required]],
            address: [null, [Validators.required]],
            phone: [null, [Validators.required, Validators.pattern('^(0|\\+84)[0-9]{9}')]]
        })
    }

    public useSessionUser(event: Event): void {
        const { checked } = event.target as HTMLInputElement;
        if (checked) {
            const user = this.dataService.currentUser$.getValue();
            console.log(user.userDto);
            this.formGroup.patchValue({
                fullName: user.userDto.fullName,
                phone: user.userDto.phone
            });
            return;
        }
        this.formGroup.reset();
    }

    public submit() {
        if (this.formGroup.invalid) {
            return;
        }
        this.activeModal.close(this.formGroup.value);
    }
}