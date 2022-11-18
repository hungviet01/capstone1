import { StadiumTypeComponent } from './components/stadium-type/stadium-type.component';
import { ActionBattleComponent, BattlePopupComponent } from './components/battle-popup/battle-popup.component';
import { FindEmptyFormComponent } from './components/find-availabel-form/find-empty-form.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { StadiumDetailContainer } from './containers/stadium-detail/stadium-detail.container';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { StadiumContainer } from './containers/stadium/stadium.container';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlideShowComponent } from './components/slide-show/slide-show.component';
import { TimePopupComponent } from './components/time-popup/time-popup.component';
import { ConfirmComponent } from './components/time-popup/confirm/confirm.component';

const routes: Routes = [
    {
        path: '',
        component: StadiumContainer,
    },
    {
        path: ':id',
        component: StadiumDetailContainer
    }
]

const declarations = [
    StadiumContainer,
    StadiumDetailContainer,

    ContactFormComponent,
    FindEmptyFormComponent,
    SlideShowComponent,
    TimePopupComponent,
    BattlePopupComponent,
    ActionBattleComponent,
    StadiumTypeComponent,
    ConfirmComponent,
]

const imports = [
    CoreModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgSelectModule,
    RouterModule.forChild(routes)
]

@NgModule({
    imports: imports,
    declarations: declarations,
    providers: [ CurrencyPipe ]
})
export class BookingModule {}