import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormArray } from '@angular/forms';
import { StadiumOption } from 'src/app/module/booking/interfaces/stadium.interface';

@Component({
    selector: 'app-option-form',
    templateUrl: './option-form.component.html',
    styleUrls: ['./option-form.component.scss']
})
export class OptionFormComponent implements OnChanges, OnInit, OnDestroy {

    private subscription: Subscription;

    @Input() control: FormArray<FormGroup>;
    @Input() oldData: StadiumOption[];


    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.oldData.currentValue) {
            this.control.clear();
            this.oldData.forEach(this.addOption.bind(this));
        }
    }

    public ngOnInit(): void {
        this.subscription = this.dataService.clear$.subscribe(res => {
            if (!res) return;
            this.control.clear();
        })
        this.addOption();
    }

    public addOption(data?: StadiumOption): void {
        const formGroup = this.fb.group({
            id: [data?.id],
            name: [data?.name, [Validators.required]]
        })
        this.control.push(formGroup);
    }

    public removeOption(index: number): void {
        this.control.removeAt(index);
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}