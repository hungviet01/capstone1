import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {
    
    constructor(
        private _sanitizer: DomSanitizer
    ) {}

    transform(value: any, option: string) {
        if (option == 'html') {
            return this._sanitizer.bypassSecurityTrustHtml(value);
        }

        if (option == 'resourceUrl') {
            return this._sanitizer.bypassSecurityTrustResourceUrl(value);
        }

        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
    
}