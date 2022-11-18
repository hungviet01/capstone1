import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private dataService: DataService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = this.dataService.currentUser$.getValue() != null;
        if (!isLoggedIn) {
            this.router.navigate(['auth', 'login'], {
                queryParams: {
                    returnUrl: this.router.url,
                }
            })
        }
        return isLoggedIn;
    }
    
}