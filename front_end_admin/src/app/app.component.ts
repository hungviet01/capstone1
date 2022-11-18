import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
		const session = localStorage.getItem('session');
		if (session) {
			const userResponse = JSON.parse(session);
			this.authService.currentUser$.next(userResponse);
			localStorage.removeItem('session');
		}
	}

  @HostListener('window:beforeunload', ['$event'])
  	public unloadHandler(event: Event) {
		localStorage.removeItem('session');
    	const userResponse = this.authService.currentUser$.getValue();
		if (userResponse) {
			localStorage.setItem('session', JSON.stringify(userResponse));
		}
  	}
}
