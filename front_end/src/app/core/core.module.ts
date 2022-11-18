import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StadiumCardComponent } from './components/_stadium-card/stadium-card.component';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './components/_editor/_editor.component';
import { CoreTableComponent } from './components/_table/_table.component';
import { RateComponent } from './components/_rate/_rate.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/_pagination/pagination.component';
import { NgModule } from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileInputerComponent } from './components/_file-inputer/_file-inputer.component';
import { ListStadiumContainer } from './components/_list-stadium/list-stadium.container';
import { AgGridModule } from 'ag-grid-angular';
import { BookingFormSearchComponent } from './components/_search-form/form-search.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import { PendingRequestComponent } from './components/_pending-request/pending-request.component';
import { ActionComponent } from './components/_pending-request/action/action.component';

const imports = [
    CommonModule,
    HttpClientModule,
    CKEditorModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    NgbModule
];

const declarations = [
    PaginationComponent,
    RateComponent,
    CoreTableComponent,
    EditorComponent,
    FileInputerComponent,
    ListStadiumContainer,
    StadiumCardComponent,
    BookingFormSearchComponent,
    PendingRequestComponent,
    ActionComponent,
    SafePipe,
];

const exports = [
    PaginationComponent,
    RateComponent,
    CoreTableComponent,
    EditorComponent,
    FileInputerComponent,
    ListStadiumContainer,
    StadiumCardComponent,
    BookingFormSearchComponent,
    PendingRequestComponent,
    ActionComponent,
    SafePipe,
]

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class CoreModule {}