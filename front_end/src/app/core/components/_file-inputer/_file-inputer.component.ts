import { AbstractControl, FormControl } from '@angular/forms';
import { OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, Renderer2, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-file-inputer',
    templateUrl: './_file-inputer.component.html',
    styleUrls: ['./_file-inputer.component.scss']
})
export class FileInputerComponent implements OnChanges, OnInit, AfterViewChecked {
    private static indexComp: number = 0;

    @ViewChild('inputerBox') inputerBox: ElementRef;
    @ViewChild('inputer') inputer: ElementRef;

    @Input() previewImage: boolean = false;
    @Input() inputerElement: HTMLLabelElement;
    @Input() multiple: boolean;
    @Input() layout: 'row' | 'column';
    @Input() control: AbstractControl<any, any>;
    @Input() oldData: string[];

    @Output() output: EventEmitter<any[]> = new EventEmitter();
    @Output() delete: EventEmitter<number> = new EventEmitter();

    public unique;
    public hiddenUploadFileButton: boolean = false;
    public imagePreviewUrls: Array<string | ArrayBuffer | null> = [];
    public files: any[] = []

    constructor(
        private renderer: Renderer2
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.oldData?.currentValue) {
            this.imagePreviewUrls = this.oldData;
            this.hiddenUploadFileButton = !this.multiple;
        }
    }

    public ngOnInit(): void {
        this.unique = this.constructor['ɵcmp'].id + FileInputerComponent.indexComp++;
    }

    public ngAfterViewChecked(): void {
        this.renderInputerElement();
    }

    private renderInputerElement(): void {
        if (!this.hiddenUploadFileButton && this.inputerElement) {
            this.inputerElement.setAttribute('for', this.unique);
            this.renderer.appendChild(this.inputerBox.nativeElement, this.inputerElement);
        }
    }

    public readURL(event): void {
        if (!this.previewImage) return;
        if (!event.target.files || !event.target.files[0]) return;
        const files = [...event.target.files];
        const file = files[0];
        this.output.emit(files);

        const loadPreviewImage = file => {
            const reader = new FileReader();
            reader.onload = e => {
                this.imagePreviewUrls.push(reader.result);
                this.files.push(file);
                this.hiddenUploadFileButton = !this.multiple;
                this.setControl();
            };
            reader.readAsDataURL(file);
        }
        this.inputer.nativeElement.value = null;
        if (!this.multiple) {
            loadPreviewImage(file);
            return;
        }
        for (const f of files) {
            loadPreviewImage(f);
        }
    }

    public removePreviewImage(index?: number): void {
        this.imagePreviewUrls.splice(index, 1);
        this.files.splice(index, 1);
        this.setControl();
        this.hiddenUploadFileButton = false;
        this.delete.emit(index);
    }

    private setControl() {
        if (this.control) {
            console.log(this.files);
            this.control.setValue(this.files);
        }
    }
}