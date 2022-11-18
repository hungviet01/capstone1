import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthorGuard } from '../core/guards/author.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(c => c.AuthModule)
    },
    {
        path: '',
        canActivate: [AuthorGuard],
        loadChildren: () => import('./main/main-layout.module').then(m => m.MainLayoutModule) 
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class LayoutRouteModule {}