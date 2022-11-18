import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './core/components/_spinner/spinner.component';
import { LayoutRouteModule } from './layout/layout-route.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ToastComponent } from './core/components/_toast/_toast.component';
import { TokenService } from './layout/auth/service/token.service';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    LayoutRouteModule,
  ],
  providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }
	],
  bootstrap: [AppComponent],
})
export class AppModule {}
