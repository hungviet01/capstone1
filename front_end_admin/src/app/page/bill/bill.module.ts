import { BillActionComponent } from './components/action/bill-action.component';
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { CoreModule } from "src/app/base/core/core.module";
import { BillRoutingModule } from "./bill-routing.module";
import { BillContainer } from "./bill.container";
import { FormSearchBillComponent } from "./components/form-search-bill/form-search-bill.component";
import { NgSelectModule } from '@ng-select/ng-select';

const imports = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.forRoot([]),

    CoreModule,
    BillRoutingModule,
    NgSelectModule,
];
const declarations = [
    BillContainer,
    FormSearchBillComponent,
    BillActionComponent,
];

@NgModule({
    imports: imports,
    declarations: declarations,
    entryComponents: [BillActionComponent],
    providers: [CurrencyPipe, DatePipe]
})
export class BillModule {}