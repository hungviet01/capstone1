import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { DataService } from '../services/data.service';
import { Role } from 'src/app/base/constant';

@Injectable({
    providedIn: 'root'
})
export class AuthorGuard implements CanActivate {

    constructor(
        private router: Router,
        private dataService: DataService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // const user = this.dataService.currentUser$.getValue();
        // const role = Role[user.userDto.role];
        return true;
    }
}