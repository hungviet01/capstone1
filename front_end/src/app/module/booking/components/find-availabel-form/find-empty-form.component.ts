import { Stadium } from './../../interfaces/stadium.interface';
import { lastValueFrom } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TimePopupComponent } from "../time-popup/time-popup.component";
import { StadiumService } from 'src/app/module/my-stadium/services/stadium.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
    selector: 'app-find-empty-form',
    templateUrl: './find-empty-form.component.html',
    styleUrls: ['./find-empty-form.component.scss']
})
export class FindEmptyFormComponent implements OnInit {

    @Input() stadium: Stadium;

    public formGroup: FormGroup;
  
    constructor(
        private fb: FormBuilder,
        private stadiumService: StadiumService,
        private modalService: NgbModal,
        private spinnerService: SpinnerService,
    ) {}

    public ngOnInit(): void {
        this.ngOnInitForm();
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            startDate: [null],
            endDate: [null],
            startTime: [null],
            endTime: [null],
            stadiumId: [this.stadium.id],
        })
    }
    
    public async submit(): Promise<void> {
        this.spinnerService.show();
        const availableStadium = await lastValueFrom(this.stadiumService.getAvailableStadium(this.formGroup.value));
        this.spinnerService.hide();
        const modalRef = this.modalService.open(TimePopupComponent, {
            centered: true,
        });
        modalRef.componentInstance.data = availableStadium;
        modalRef.componentInstance.stadium = this.stadium;
    }
}