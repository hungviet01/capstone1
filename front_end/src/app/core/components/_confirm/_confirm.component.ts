import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Confirm } from './../../interfaces/confirm.interface';
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-confirm',
    templateUrl: './_confirm.component.html',
    styleUrls: ['./_confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
    
    @Input() content: Confirm;

    constructor(
        public activeModal: NgbActiveModal
    ) {}

    public ngOnInit(): void {
        if (!this.content) {
            throw new Error("Content can not null in Confirm Component");
        }
    }
}