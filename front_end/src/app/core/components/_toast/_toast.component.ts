import { Component } from "@angular/core";
import { ToastService } from "../../services/toast.service";

@Component({
    selector: 'app-toast',
    templateUrl: './_toast.component.html',
    styleUrls: ['./_toast.component.scss'],
    host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastComponent {

    constructor(
        public toastService: ToastService
    ) { }
}