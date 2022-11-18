import { CurrencyPipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { Time } from "../../interfaces/time.interface";

@Component({
    selector: 'app-stadium-type',
    templateUrl: './stadium-type.component.html',
    styleUrls: ['./stadium-type.component.scss']
})
export class StadiumTypeComponent implements OnInit {

	@Input() rows: Time[];
   

    constructor() {}

    public ngOnInit(): void {
    }
}