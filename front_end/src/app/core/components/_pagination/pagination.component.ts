import { Paginator } from './../../interfaces/paginator.interface';
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
    public page = 1;

    @Input() paginator: Paginator;
    @Output() paginate: EventEmitter<number> = new EventEmitter();

    public pageChange(e) {
        this.paginator.currentPage = e;
        this.paginate.emit(e);
    }
}