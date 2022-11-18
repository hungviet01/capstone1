import { filter } from 'rxjs';
import { Component, Input, OnInit } from "@angular/core";
import { Role } from "src/app/base/constant";
import { Menu } from "src/app/base/menu.config";
import { DataService } from "src/app/core/services/data.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './_navbar.component.html',
    styleUrls: ['./_navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Input() layout: 'column' | 'row' = 'row';
    
    public menu = Menu;
    public role = Role.USER;

    constructor(
        private dataService: DataService,
    ) {}

    public ngOnInit(): void {
        this.dataService.currentUser$
            .pipe(filter(u => u != null))
            .subscribe(u => {
                this.role = Role[u.userDto.role];
            })
    }
}