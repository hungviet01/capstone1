import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BillContainer } from "./bill.container";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '',
            component: BillContainer,
        }])
    ],
    exports: [RouterModule]
})
export class BillRoutingModule {}