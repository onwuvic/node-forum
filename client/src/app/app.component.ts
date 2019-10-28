import { Component } from '@angular/core';

import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';

const REDIRECT_TO_LOGIN = ['/threads/create'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn$ = this.authService.isLoggedIn$;
  authUser$ = this.authService.authUser;

  logout() {
    // dirty fix
    const foundUrl = REDIRECT_TO_LOGIN.find(url => url === this.router.url);
    if (foundUrl) {
      this.router.navigate(['/auth', 'login']);
    }
    this.authService.clear();
  }
}
