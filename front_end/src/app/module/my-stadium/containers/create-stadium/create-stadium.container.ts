import { StadiumImage } from './../../../booking/interfaces/stadium.interface';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, map, filter, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnDestroy } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { StadiumService } from '../../services/stadium.service';
import { prepareSubmitForm } from 'src/app/base/helper';
import { ToastService } from 'src/app/core/services/toast.service';
import { StadiumOptionService } from '../../services/stadium-option.service';
import { Stadium, StadiumOption } from 'src/app/module/booking/interfaces/stadium.interface';
import { Time } from 'src/app/module/booking/interfaces/time.interface';
import { StadiumImageService } from '../../services/stadium-image.service';

@Component({
    selector: 'app-create-stadium',
    templateUrl: './create-stadium.container.html',
    styleUrls: ['./create-stadium.container.scss']
})
export class CreateStadiumContainer implements OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    
    // old data
    public basicInfo$: Observable<Stadium>;
    public stadiumOption$: Observable<StadiumOption[]>;
    public stadiumDetail$: Observable<Time[]>;
    public stadiumImage: StadiumImage[];
    public images: string[];
    public title: string = 'Tạo mới sân bóng';
    private isUpdate: boolean = false;
    private stadiumId: string;
    //

    public formGroup: FormGroup;
    public formArray: FormArray<FormGroup> = new FormArray([])
    public typeStadium: FormArray<FormGroup> = new FormArray([]);
    public files;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private stadiumService: StadiumService,
        private toastService: ToastService,
        private router: ActivatedRoute,
        private stadiumOptionService: StadiumOptionService,
        private stadiumImageService: StadiumImageService,
    ) {} 

    public ngOnInit(): void {
        this.ngOnInitForm();
        this.router.params
            .pipe(
                map(param => param.id),
                filter(id => id != undefined)
            )
            .subscribe(this.loadStadiumToUpdate.bind(this))
    }

    private loadStadiumToUpdate(stadiumId: string): void {
        this.title = 'Cập nhật sân bóng';
        this.stadiumId = stadiumId;
        this.isUpdate = true;
        this.basicInfo$ = this.stadiumService.getStadiumById(stadiumId);
        this.stadiumOption$ = this.stadiumOptionService.getStadiumOption(stadiumId);
        this.stadiumDetail$ = this.stadiumService.getStadiumDetail(stadiumId);
        this.stadiumImageService.getStadiumImage(stadiumId)
            .subscribe(images => {
                this.stadiumImage = images;
                this.images = images.map(img => img.image);
            });
    }

    public deleteStadiumImage(index: number): void {
        if (!this.stadiumImage) return;
        this.stadiumImage.splice(index, 1);
    }

    public clearAllOption(): void {
        this.dataService.clear$.next(true);
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            districtId: [null, [Validators.required]],
            provinceId: [null, [Validators.required]],
            address: [null, [Validators.required]],
            avatarFile: [null, [Validators.required]],
            description: [null],
            options: [this.formArray],
            images: [null],
            details: [this.typeStadium]
        })
    }

    public submit(): void {
        prepareSubmitForm(this.formGroup);
        prepareSubmitForm(this.formArray);
        prepareSubmitForm(this.typeStadium);
        console.log(this.formGroup.invalid, this.formArray.invalid, this.typeStadium.invalid);
        if (this.formGroup.invalid || this.formArray.invalid || this.typeStadium.invalid) {
            this.toastService.error('Thông tin không hợp lệ');
            return;
        }
        const { value } = this.formGroup;
        const data = {
            ...value,
            details: value.details.value,
            options: value.options.value,
        }
        if (this.stadiumImage) {
            data.imageDto = this.stadiumImage;
        }
        const avatarFile = data.avatarFile?.[0];
        const images = data.images;
        delete data.images;
        delete data.avatarFile;
        const formData = new FormData();
        formData.append('stadiumDto', new Blob([JSON.stringify(data)], {
            type: 'application/json'
        }));
        formData.append('avatarFile', avatarFile);
        images?.forEach(image => formData.append('images', image))

        const execute = (action: Observable<any>) => {
            action
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(res => {
                    history.back();
                })
        }

        if (this.isUpdate) {
            execute(this.stadiumService.updateStadium(this.stadiumId, formData));
            return;
        }
        execute(this.stadiumService.createStadium(formData));
    }

    public cancel(): void {
        history.back()
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}