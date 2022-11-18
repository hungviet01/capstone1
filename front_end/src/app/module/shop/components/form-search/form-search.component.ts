import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Category } from "../../interfaces/category.interface";
import { CategoryService } from "../../services/category.service";

@Component({
    selector: 'app-cart-form-search',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {

    @Input() searchAfterInit: boolean = false;

    @Output() search: EventEmitter<any> = new EventEmitter();

    public formGroup: FormGroup;
    public categories$: Observable<Category[]>;

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
    ) {}

    public ngOnInit(): void {
        this.categories$ = this.categoryService.getCategory();
        this.ngOnInitForm();
        if (this.searchAfterInit) this.submitSearch();
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            categoryId: [null],
            productName: []
        })
    }

    public submitSearch(): void {
        this.search.emit(this.formGroup.value);
    }
}