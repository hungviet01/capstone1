import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { SpinnerService } from "../../services/spinner.service";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

    public spinner: Observable<boolean>;

    constructor(
        public spinnerService: SpinnerService,
    ) {
        this.spinner = this.spinnerService.spinner$.asObservable();
    }
}