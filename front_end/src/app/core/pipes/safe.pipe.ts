import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor(
        private _sanitizer: DomSanitizer
    ) {}

    transform(value: any, arg: 'html' | 'resourceUrl'): SafeHtml | SafeResourceUrl {
        if (arg == 'html') {
            return this._sanitizer.bypassSecurityTrustHtml(value);
        }

        if (arg == 'resourceUrl') {
            return this._sanitizer.bypassSecurityTrustResourceUrl(value);
        }

        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
}