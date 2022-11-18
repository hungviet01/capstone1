import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-button-create',
    templateUrl: './button-create.component.html',
    styleUrls: ['./button-create.component.scss']
})
export class ButtonCreateComponent {

    @Input() label: string;
    @Output('onClick') click: EventEmitter<void> = new EventEmitter();

    constructor() {}

    public onClick(): void {
        this.click.emit();
    }
}