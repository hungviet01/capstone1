import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorGuard implements CanActivate {
    
    constructor(
        private dataService: DataService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.dataService.currentUser$.getValue();
        if (!currentUser) return false;
        const roles = route.data.roles as string[];
        if (roles.includes(currentUser.userDto.role)) return true;

        this.router.navigate(['/auth', 'login'], {
            queryParams: {
                returnUrl: this.router.url
            }
        })
        return false;
    }
    
}