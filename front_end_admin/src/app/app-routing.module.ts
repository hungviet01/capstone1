import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./base/core/guard/auth.guard";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },

    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'product',
                loadChildren: () => import('./page/product/product.module').then(m => m.ProductModule)
            },
            {
                path: 'user',
                loadChildren: () => import('./page/user/user.module').then(m => m.UserModule)
            },
            {
                path: 'category',
                loadChildren: () => import('./page/category/category.module').then(m => m.CategoryModule)
            },
            {
                path: 'bill',
                loadChildren: () => import('./page/bill/bill.module').then(m => m.BillModule)
            },
            {
                path: 'feedback',
                loadChildren: () => import('./page/comment/comment.module').then(m => m.CommentModule)
            }
        ]
    },
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}