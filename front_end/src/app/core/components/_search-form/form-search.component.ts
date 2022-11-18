import { Subject, takeUntil } from 'rxjs';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DataService } from "../../services/data.service";
import { District, Province } from '../../interfaces/address.interface';

@Component({
    selector: 'app-booking-form-search',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class BookingFormSearchComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<any> = new Subject();

    @Output() search: EventEmitter<any> = new EventEmitter();

    public formGroup: FormGroup;
    public provinceList: Province[];
    public districtList: District[];

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
    ) {}

    public ngOnInit(): void {
        this.ngOnInitForm();
        this.ngOnInitChangeEvent();
        this.ngOnLoadProvince();
        this.submit();
    }

    public submit(): void {
        this.search.emit(this.formGroup.value);
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            provinceId: [null],
            districtId: [null],
            name: [null]
        })
    }

    private ngOnInitChangeEvent(): void {
        this.formGroup.get('provinceId').valueChanges.subscribe(this.ngOnLoadDistrict.bind(this))
    }

    private ngOnLoadProvince(): void {
        this.provinceList = [];
        this.dataService.getProvince()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => this.provinceList = res);
    }

    private ngOnLoadDistrict(provinceId: number) {
        this.districtList = [];
        console.log(provinceId);
        if (provinceId == null) return;
        this.dataService.getDistrict(provinceId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => this.districtList = res)
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}