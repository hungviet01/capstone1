import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserContainer } from "./user.container";

const routes: Routes = [
    {
        path: '',
        component: UserContainer
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class UserRoutingModule {}