import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenGuard implements CanActivate {

    constructor(
        private dataService: DataService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.dataService.currentUser$.getValue();
        const doChain = ![null, undefined].includes(currentUser);
        if (!doChain) {
            this.router.navigate(['/auth', 'login'], {
                queryParams: {
                    returnUrl: this.router.url
                }
            })
        }
        return doChain;
    }
}