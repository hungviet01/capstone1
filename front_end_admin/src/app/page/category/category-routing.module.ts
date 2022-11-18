import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CategoryContainer } from "./category.container";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '',
            component: CategoryContainer
        }])
    ],
    exports: [RouterModule]
})
export class CategoryRoutingModule {}