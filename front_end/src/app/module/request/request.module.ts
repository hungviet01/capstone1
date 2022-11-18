import { ChallengeRequestComponent } from './containers/challenge-request/challenge-request.component';
import { RequestRentContainer } from './containers/request-rent/request-rent.container';
import { CoreModule } from 'src/app/core/core.module';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FindingRequestContainer } from './containers/finding-request/finding-request.container';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { UserRequestContainer } from './containers/user-request/user-request.container';
import { ChallengeActionComponent } from './containers/challenge-request/action/action.component';
import { AuthenGuard } from 'src/app/base/guard/authen.guard';
import { AuthorGuard } from 'src/app/base/guard/author.guard';
import { Role } from 'src/app/base/constant';

const routes: Routes = [
    {
        path: 'rent',
        component: RequestRentContainer,
        canActivate: [ AuthenGuard, AuthorGuard ],
        data: {
            roles: [ Role.OWNER_STADIUM ]
        }
    },
    {
        path: '',
        component: UserRequestContainer,
        children: [
            {
                path: 'finding-request',
                component: FindingRequestContainer,
                canActivate: [ AuthenGuard, AuthorGuard ],
                data: {
                    roles: [ Role.USER ]
                }
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'finding-request'
            }
        ],
    },
]

const imports = [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
];
const declarations = [
    UserRequestContainer,
    FindingRequestContainer,
    ChallengeRequestComponent,
    ChallengeActionComponent,
    RequestRentContainer
];
const exports = [];

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports,
    providers: [ CurrencyPipe ]
})
export class RequestModule {}