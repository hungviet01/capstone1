import { Stadium } from './../../../booking/interfaces/stadium.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { District, Province } from 'src/app/core/interfaces/address.interface';

@Component({
    selector: 'app-info-stadium-form',
    templateUrl: './info-stadium-form.component.html',
    styleUrls: ['./info-stadium-form.component.scss']
})
export class InfoStadiumFormComponent implements OnChanges, OnInit, OnDestroy {
    
    private unsubscribe$: Subject<any> = new Subject();

    @Input() formGroup: FormGroup;
    @Input() oldData: Stadium;

    public provinceList: Province[];
    public districtList: District[];
    public avatarFile: File;

    public get formControl() {
        return this.formGroup?.controls;
    }

    constructor(
        private fb: FormBuilder,
        private dataService: DataService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.formGroup?.currentValue) {
            this.ngOnInitChangeEvent();
        };

        if (changes.oldData.currentValue) {
            this.formGroup.patchValue({
                id: this.oldData.id,
                name: this.oldData.name,
                districtId: this.oldData.districtId,
                provinceId: this.oldData.provinceId,
                address: this.oldData.address,
                description: this.oldData.description,
            });
            this.formControl.avatarFile.clearValidators();
            this.formControl.avatarFile.updateValueAndValidity();
        }
            
    }

    public ngOnInit(): void {
        this.ngOnLoadProvince();
    }

    private ngOnInitChangeEvent(): void {
        this.formGroup.get('provinceId').valueChanges.subscribe(this.ngOnLoadDistrict.bind(this));
    }
   

    private ngOnLoadProvince(): void {
        this.provinceList = [];
        this.dataService.getProvince()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => this.provinceList = res);
    }

    private ngOnLoadDistrict(provinceId: number): void {
        this.districtList = [];
        if (!provinceId) return;
        this.dataService.getDistrict(provinceId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => this.districtList = res);
    }

    public ngOnDeleteAvatarFile(): void {
        this.formControl.avatarFile.setValidators(Validators.required);
        this.formControl.avatarFile.updateValueAndValidity();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}