import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayout } from './auth.layout';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/sign-up.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent,
            },
            {
                path: 'otp',
                component: OtpComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        AuthLayout,
        LoginComponent,
        SignUpComponent,
        OtpComponent,
    ]
})
export class AuthModule {}