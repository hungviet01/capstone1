import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionGridComponent } from './components/cells/action-grid/action.component';
import { ButtonCreateComponent } from './components/buttons/create/button-create.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfirmComponent } from './components/popup-confirm/popup-confirm.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SafePipe } from './pipes/safe.pipe';
import { StatusComponent } from './components/cells/status/status.component';
import { EditorComponent } from './components/_editor/_editor.component';
import { FormsModule } from '@angular/forms';

const imports: any = [
    CommonModule,
    MatDialogModule,
    FormsModule,
    CKEditorModule,
]
const declarations: any = [
    SpinnerComponent,
    PaginationComponent,
    ActionGridComponent,
    ConfirmComponent,
    ButtonCreateComponent,
    StatusComponent,
    EditorComponent,

    // pipes
    SafePipe,
]
const exports: any = [
    SpinnerComponent,
    PaginationComponent,
    ActionGridComponent,
    ConfirmComponent,
    ButtonCreateComponent,
    StatusComponent,
    EditorComponent,
    // pipes
    SafePipe,
]

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class CoreModule {}