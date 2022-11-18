import { Challenge } from './../../../interfaces/request.interface';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { RequestService } from '../../../services/request.service';
import { ChallengeRequestComponent } from '../challenge-request.component';

@Component({
    selector: 'app-challenge-action',
    templateUrl: './action.component.html',
    styles: [`
        i {
            color: green;
            font-size: 20px;
            cursor: pointer;
        }
        
        .fas.fa-window-close {
            color: rgba(var(--bs-danger-rgb), 1);
        }
    `]
})
export class ChallengeActionComponent implements ICellRendererAngularComp {
    
    public params: ICellRendererParams<Challenge, any>;
    private context: ChallengeRequestComponent;

    constructor(
        private requestService: RequestService
    ) {}

    public agInit(params: ICellRendererParams<Challenge, any>): void {
        this.params = params;
        this.context = this.params.context;
    }
   
    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public approveRequset(): void {
        this.requestService.approveChallengeRequest(this.params.data.id)
            .subscribe(res => {
                    this.context.closeModal();
            })
    }

    public rejectRequest(): void {
        this.requestService.rejectChallengeRequest(this.params.data.id)
            .subscribe(res => {
                this.context.closeModal();
            })
    }
}