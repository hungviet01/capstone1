import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SpinnerService } from "../../services/spinner.service";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

    loading: boolean;

    constructor(
        private spinnerService: SpinnerService,
    ) {}

    ngOnInit(): void {
        this.spinnerService.spinner.subscribe(loading => {
            this.loading = loading;
        })
    }

    ngOnDestroy(): void {
    }
}