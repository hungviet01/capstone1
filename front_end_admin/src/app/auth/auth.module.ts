import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        AuthComponent,
    ]
})
export class AuthModule {}