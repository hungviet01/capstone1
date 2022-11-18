import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Time } from 'src/app/module/booking/interfaces/time.interface';

@Component({
    selector: 'app-type-stadium-form',
    templateUrl: './type-stadium-form.component.html',
    styleUrls: ['./type-stadium-form.component.scss']
})
export class TypeStadiumFormComponent implements OnChanges, OnInit {

    @Input() formGroups: FormArray<FormGroup>;
    @Input() oldData: Time[];

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.oldData.currentValue) {
            this.formGroups.clear();
            this.oldData.forEach(this.addTypeForm.bind(this));
        }
    }

    public ngOnInit(): void {
        this.addTypeForm();
    }

    public addTypeForm(data?: Time): void {
        const formGroup = this.fb.group({
            id: [data?.id],
            name: [data?.name, [Validators.required]],
            quantity: [data?.quantity, [Validators.required, Validators.pattern('[0-9]+')]],
            types: this.fb.array([])
        })

        if (data?.children) {
            data.children.forEach(time => {
                this.addTime(formGroup, time);   
            })
        } else {
            this.addTime(formGroup);
        }
        this.formGroups.push(formGroup);
    }

    public removeTypeForm(index: number): void {
        if (this.formGroups.length == 1) {
            return;
        }
        this.formGroups.removeAt(index);
    }

    public addTime(formGroup: FormGroup, data?: Time): void {
        this.getTypes(formGroup).push(this.fb.group({
            id: [data?.id],
            startTime: [data?.startTime, [Validators.required]],
            endTime: [data?.endTime, [Validators.required]],
            price: [data?.price, [Validators.required, Validators.pattern('[0-9]+')]]
        }))
    }

    public removeTime(formGroup: FormGroup, index: number): void {
        const types = this.getTypes(formGroup);
        if (types.length == 1) {
            return;
        }
        types.removeAt(index);
    }

    public getControl(formGroup: FormGroup) {
        return formGroup.controls;
    }

    public getTypes(formGroup: FormGroup) {
        return this.getControl(formGroup)['types'] as FormArray;
    }
}