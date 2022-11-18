import { MobileNavbarComponent } from './_mobile/_navbar/_mobile-navbar.component';
import { CoreModule } from 'src/app/core/core.module';
import { NavbarComponent } from './_navbar/_navbar.component';
import { PageRoutingModule } from '../../page-routing/page-route.module';
import { MainLayout } from './main.layout';
import { NgModule } from "@angular/core";
import { Header1Component } from './_header1/_header1.component';
import { FooterComponent } from './_footer/_footer.component';
import { Header2Component } from './_header2/_header2.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './_slide/_slide.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from './_feedback/_feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const declarations = [
    MainLayout,
    Header1Component,
    Header2Component,
    NavbarComponent,
    FooterComponent,
    SlideComponent,
    MobileNavbarComponent,
    FeedbackComponent
]

const imports = [
    CommonModule,
    CoreModule,
    PageRoutingModule,
    InlineSVGModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
]

@NgModule({
    declarations: declarations,
    imports: imports,
})
export class MainLayoutModule {}