import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { STATUS } from "src/app/base/_helpers/constant";
import { recursive } from "src/app/base/_helpers/helper";
import { ProductImageModel } from "../../models/product-image.model";
import { ProductModel } from "../../models/product.model";
import { ProductService } from "../../services/product.service";

@Component({
    selector: 'app-create-update-product',
    templateUrl: './create-update-product.component.html',
    styleUrls: ['./create-update-product.component.scss']
})
export class CreateUpdateProductComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();

    public status: StatusModel[] = STATUS;
    public formGroup: FormGroup;
    public images: ProductImageModel[] = []; // store base64 image to show to UI;
    public avatar: string;

    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private productService: ProductService,
        private matDialogRef: MatDialogRef<CreateUpdateProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    public ngOnInit(): void {
        this.initForm();
        this.getControl.categoryId.setValue(this.data.categoryList[0]?.id);
        if (this.data.product) {
            this.initData(this.data.product);
            this.getSize();
            this.getImages();
        }
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            price: [null, [Validators.required]],
            categoryId: [null, [Validators.required]],
            status: [{value: 1, disabled: true}],
            description: [null],
            quantity: [null, [Validators.required, Validators.min(1)]],
            avatarFile: [null, [Validators.required]],
            avatar: [null],
            sizes: this.fb.array([])
        });
    }

    public initData(product: ProductModel): void {
        this.formGroup.patchValue(product);
        this.avatar = product.avatar;
        this.formGroup.get('avatarFile').clearValidators();
        this.formGroup.get('avatarFile').updateValueAndValidity();
    }

    public getSize(): void {
        this.productService
            .getSizeByProduct(this.data.product.id)
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(res => {
                this.sizes.clear();
                res.forEach(size => {
                    this.addSize();
                })
                this.sizes.patchValue(res);
            })
    }

    public getImages(): void {
        this.productService
            .getImages(this.data.product.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.images = res;
            })
    }

    public addSize(): void {
        this.sizes.push(this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            productId: [this.data.product?.id],
        }))
    }

    public deleteSize(index: number): void {
        this.sizes.removeAt(index);
    }

    public onUploadImage(event, isAvatar: boolean = false): void {
        const files = event.target.files as FileList;
        
        if (!files?.length) return;
        const fileArray = Array.from(files);
        if (fileArray.some(file => !['image/jpeg', 'image/png'].includes(file.type))) {
            this.toastrService.error('File upload không đúng định dạng ảnh!');
            return;
        }
        if (isAvatar) {
            this.avatar = URL.createObjectURL(fileArray[0]);
            this.formGroup.get('avatarFile').setValue(fileArray[0]);
        } else {
            fileArray.forEach(file => {
                const imageUrl = URL.createObjectURL(file);
                this.images.push({
                    url: imageUrl,
                    file: file,
                    productId: this.data.product?.id,
                });
            });
        }
    }

    public onDeleteAvatar() {
        this.avatar = null;
        this.formGroup.get('avatarFile').setValidators(Validators.required);
        this.formGroup.get('avatarFile').setValue(null);
        this.formGroup.get('avatarFile').markAsDirty();
        this.formGroup.get('avatarFile').updateValueAndValidity();
    }

    public onDeleteImage(index: number): void {
        this.images = this.images.filter((image, i) => i !== index);
    }

    public submit(): void {
        recursive(this.formGroup);
        const { value, invalid } = this.formGroup;
        if (invalid) return;
        value.images = this.images.filter(image => image.id);
        const newImage = this.images.filter(image => image.file);
        console.log(value);
        const formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(value)], { type: 'application/json'}));
        formData.append('avatarFile', value.avatarFile);
        newImage?.forEach(image => {
            formData.append('images', image.file);
        })
        this.productService
            .save(formData)
            .subscribe(res => {
                this.matDialogRef.close({action: 'save'});
            })
            
    }

    get getControl() {
        return this.formGroup.controls;
    }

    get sizes() {
        return this.getControl.sizes as FormArray;
    }

    public ngOnDestroy(): void {
        this.unsubscribe$ && this.unsubscribe$.unsubscribe();
    }

}