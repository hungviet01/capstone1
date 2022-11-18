import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommentContainer } from './comment.container';
import { NgModule } from "@angular/core";
import { AgGridModule } from 'ag-grid-angular';
import { FormSearchCommentComponent } from './components/form-search/form-search.component';
import { CoreModule } from 'src/app/base/core/core.module';
import { ActionComponent } from './components/action/action.component';

const routes: Routes = [
    {
        path: '',
        component: CommentContainer
    }
]

const imports = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    AgGridModule.forRoot([]),
    NgSelectModule,
    MatDialogModule,

    CoreModule,
];
const declarations = [
    CommentContainer,
    FormSearchCommentComponent,
    ActionComponent,
];

@NgModule({
    imports: imports,
    declarations: declarations,
    providers: [DatePipe]
})
export class CommentModule {}