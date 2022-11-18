import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { NgSelectModule } from "@ng-select/ng-select";
import { AgGridModule } from "ag-grid-angular";
import { CoreModule } from "src/app/base/core/core.module";
import { ActionGridComponent } from "./components/action/action.component";
import { FormSearchUserComponent } from "./components/form-search-user/form-search-user.component";
import { UpdateUserComponent } from "./components/update-user/update-user.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserContainer } from "./user.container";

const imports = [
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AgGridModule.forRoot([]),
    MatDialogModule,

    UserRoutingModule,
];

const declarations = [
    UserContainer,
    FormSearchUserComponent,
    UpdateUserComponent,
    ActionGridComponent
]

@NgModule({
    imports: imports,
    declarations: declarations,
})
export class UserModule {}