import { Component } from '@angular/core';
import { MenuModel } from 'src/app/base/core/models/menu.model';
import { Menu } from 'src/app/base/core/_menu.config';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    
    menu$: MenuModel[] = Menu;

    public collapse(item: MenuModel): void {
        item.isExpanded = !item.isExpanded;
    }
}