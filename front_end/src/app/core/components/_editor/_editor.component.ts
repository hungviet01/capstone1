import { Subscription } from 'rxjs';
import { FormControl, AbstractControl } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as CkEditorClassic from './ckeditor5/build/ckeditor.js';

@Component({
    selector: 'app-editor',
    templateUrl: './_editor.component.html',
    styleUrls: ['./_editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    @Input() control: AbstractControl<any, any>;

    public _editor = CkEditorClassic;
    public content: string;
    public _config = {
        shouldNotGroupWhenFull: false
    }

    public ngOnInit(): void {
        if (this.control) {
            this.subscription = this.control.valueChanges.subscribe(res => {
                this.content = res;
            })
        }
    }

    public onChanges(event): void {
        if (this.control) {
            this.control.setValue(this.content);
        }
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}