import { TypeStadiumFormComponent } from './components/type-stadium-form/type-stadium-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionFormComponent } from './components/option-form/option-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { MyStadiumContainer } from './containers/my-stadium/my-stadium.container';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CreateStadiumContainer } from './containers/create-stadium/create-stadium.container';
import { InfoStadiumFormComponent } from './components/info-stadium-form/info-stadium-form.component';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
    {
        path: '',
        component: MyStadiumContainer
    },
    {
        path: 'create-stadium',
        component: CreateStadiumContainer
    },
    {
        path: 'update-stadium/:id',
        component: CreateStadiumContainer
    }
]

const imports = [
    CoreModule,
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
];
const declarations = [
    MyStadiumContainer,
    CreateStadiumContainer,

    InfoStadiumFormComponent,
    OptionFormComponent,
    TypeStadiumFormComponent
];

@NgModule({
    imports: imports,
    declarations: declarations
})
export class MyStadiumModule {}