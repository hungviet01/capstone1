import { Toast } from './../interfaces/toast.interface';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    public toast: Toast[] = [];

    public success(content: string): void {
        this.toast.push({
            text: content,
            type: 'success',
            id: new Date().getTime()
        })
    }

    public error(content: string): void {
        this.toast.push({
            text: content,
            type: 'error',
            id: new Date().getTime()
        })
    }

    public warning(content: string): void {
        this.toast.push({
            text: content,
            type: 'warning',
            id: new Date().getTime()
        })
    }

    public remove(id): void {
        const index = this.toast.findIndex(t => t.id == id);
        this.toast.splice(index, 1);
    }
}