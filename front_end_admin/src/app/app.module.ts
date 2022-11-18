import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { JwtInterceptor } from './base/core/services/jwt-interceptor.service';
import { UserInformationComponent } from './layout/components/_user-information/user-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './base/core/core.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/components/_header/header.component';
import { FooterComponent } from './layout/components/_footer/footer.component';
import { SidebarComponent } from './layout/components/_sidebar/sidebar.component';

@NgModule({
	declarations: [
		AppComponent,
		LayoutComponent,
		HeaderComponent,
		FooterComponent,
		SidebarComponent,
		UserInformationComponent,
	],
	imports: [
		CoreModule,
		BrowserModule,
		AppRoutingModule,
		ToastrModule.forRoot(),
		HttpClientModule,
		BrowserAnimationsModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
	],
	bootstrap: [AppComponent],
	entryComponents: [
		UserInformationComponent,
	]
})
export class AppModule { }
