import { UserResponse } from './core/interfaces/user.interface';
import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from './core/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
	constructor(
		private dataService: DataService
	) {}

	public ngOnInit(): void {
		const session = localStorage.getItem('session');
		if (session) {
			const userResponse = JSON.parse(session) as UserResponse;
			this.dataService.currentUser$.next(userResponse);
			localStorage.removeItem('session');
		}
	}
	
	@HostListener('window:beforeunload', ['$event'])
  	public unloadHandler(event: Event) {
		localStorage.removeItem('session');
    	const userResponse = this.dataService.currentUser$.getValue();
		if (userResponse) {
			localStorage.setItem('session', JSON.stringify(userResponse));
		}
  	}
}
