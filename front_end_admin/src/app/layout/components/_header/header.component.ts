import { Component } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.componet.scss']
})
export class HeaderComponent {
    
    constructor(
        private authService: AuthService
    ){}

    public logout(): void {
        this.authService.logout();
    }
}