import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from "rxjs";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
    selector: 'app-confirm-shopping',
    templateUrl: './confirm-shopping.component.html',
    styleUrls: ['./confirm-shopping.component.scss']
})
export class ConfirmShoppingComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    
    public price: number;
    public maxQuantity: number;
    public productSize$: Observable<any>;
    public formGroup: FormGroup;
    public listSize;

    constructor(
        private fb: FormBuilder,
        private activeModal: NgbActiveModal,
        private toastService: ToastService,
    ) {}

    public ngOnInit(): void {
        this.formGroup = this.fb.group({
            sizeId: [null],
            quantity: [1],
        })
        this.subscription = this.productSize$.subscribe(res => {
            this.listSize = res;
            this.formGroup.get('size').setValue(this.listSize[0].id);
        })
        
    }

    public submit(): void {
        this.activeModal.close(this.formGroup.value);
    }

    public cancel(): void {
        this.activeModal.close();
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}