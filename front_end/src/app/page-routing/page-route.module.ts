import { pageRoutes } from './page.route';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

@NgModule({
    imports: [ RouterModule.forChild(pageRoutes) ],
    exports: [ RouterModule ]
})
export class PageRoutingModule {}