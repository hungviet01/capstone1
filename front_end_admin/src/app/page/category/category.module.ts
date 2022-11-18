import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { NgSelectModule } from "@ng-select/ng-select";
import { AgGridModule } from "ag-grid-angular";
import { CoreModule } from "src/app/base/core/core.module";
import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryContainer } from "./category.container";
import { CreateUpdateCategoryComponent } from "./components/create-update-category/create-update-category.component";
import { FormSearchCategoryComponent } from "./components/form-search-category/form-search-category.component";

const imports = [
    CommonModule,
    NgSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.forRoot([]),

    CoreModule,
    CategoryRoutingModule,
];
const declarations = [
    CategoryContainer,
    CreateUpdateCategoryComponent,
    FormSearchCategoryComponent,
];

@NgModule({
    imports: imports,
    declarations: declarations
})
export class CategoryModule {}