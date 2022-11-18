import { PaginationModel } from './../../base/core/models/pagination.model';
import { CommentService } from './services/comment.service';
import { BASE_STYLE } from 'src/app/base/_helpers/constant';
import {
	ColDef,
	GridReadyEvent,
} from 'ag-grid-community';
import { FeedbackModel } from './models/feeback.model';
import { Component, OnInit } from "@angular/core";
import { DatePipe } from '@angular/common';
import 'ag-grid-enterprise';
import { ActionComponent } from './components/action/action.component';

@Component({
	selector: 'app-comment-container',
	templateUrl: './comment.container.html',
	styleUrls: ['./comment.container.scss']
})
export class CommentContainer implements OnInit {

	private currentFormSearch: FeedbackModel;
	private params;

	public columnDefs: ColDef[];
	public rowData: FeedbackModel[];

	pagination: PaginationModel;

	constructor(
		private commentService: CommentService,
		private datePipe: DatePipe
	) { }

	public ngOnInit(): void {
		this.pagination = new PaginationModel();
		this.initColumn();
	}

	private initColumn(): void {
		this.columnDefs = [
			{
				headerName: 'Người tạo',
				headerTooltip: 'Tên sản phẩm',
				field: 'fullName',
				tooltipField: 'fullName',
				cellStyle: BASE_STYLE,
				minWidth: 200,
			},
			
			{
				headerName: 'Số điện thoại',
				headerTooltip: 'Số điện thoại',

				minWidth: 150,
				maxWidth: 150,
				cellStyle: BASE_STYLE,
				field: 'phone',
				tooltipField: 'phone'
			},
			{
				headerName: 'Email',
				headerTooltip: 'Email',

				minWidth: 150,
				maxWidth: 150,
				cellStyle: BASE_STYLE,
				field: 'email',
				tooltipField: 'email'
			},
			{
				headerName: 'Ngày tạo',
				headerTooltip: 'Ngày tạo',

				minWidth: 150,
				maxWidth: 150,
				cellStyle: BASE_STYLE,
				valueGetter: params => this.datePipe.transform(params.data.createdDate, 'dd/MM/yyyy'),
				tooltipValueGetter: params => this.datePipe.transform(params.data.createdDate, 'dd/MM/yyyy'),

			},

			{
				cellStyle: {
					'display': 'flex',
					'align-items': 'center',
					'justify-content': 'center'
				},
				minWidth: 100,
				cellRenderer: ActionComponent,
			},
		]

	}

	public doSearch(data?: FeedbackModel): void {
		if (data) this.currentFormSearch = data;
		this.commentService.search({
			page: this.pagination.currentPage,
			pageSize: this.pagination.pageSize,
			data: this.currentFormSearch
		})
		.subscribe(res => {
			this.rowData = res.data;
			this.pagination.dataLength = res.data.length;
			this.pagination.totalPage = Math.ceil(res.total / this.pagination.pageSize);
			this.pagination.totalRecord = res.total;
		})

	}

	public onGridReady(event: GridReadyEvent): void {
		this.params = event;
		event.api.sizeColumnsToFit();
	}

}