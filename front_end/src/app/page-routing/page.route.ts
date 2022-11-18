import { AuthenGuard } from './../base/guard/authen.guard';
import { MainLayout } from './../layout/main/main.layout';
import { Routes } from '@angular/router';
import { AuthorGuard } from '../base/guard/author.guard';
import { Role } from '../base/constant';

export const pageRoutes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'stadium',
                loadChildren: () => import('../module/booking/booking.module').then(m => m.BookingModule)
            },
            {
                path: 'my-stadium',
                canActivate: [ AuthenGuard, AuthorGuard ],
                data: {
                    roles: [ Role.OWNER_STADIUM ]
                },
                loadChildren: () => import('../module/my-stadium/my-stadium.module').then(m => m.MyStadiumModule)
            },
            {
                path: 'request',
                loadChildren: () => import('../module/request/request.module').then(m => m.RequestModule)  
            },
            {
                path: 'shop',
                loadChildren: () => import('../module/shop/shop.module').then(m => m.ShopModule),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'stadium'
            }
        ]
    },
]