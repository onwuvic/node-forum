import { Component } from '@angular/core';

import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ChannelService } from './core/services/channel/channel.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const REDIRECT_TO_LOGIN = ['/threads/create'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private channelService: ChannelService
    ) {}

  isLoggedIn$ = this.authService.isLoggedIn$;
  authUser$ = this.authService.authUser;
  channels$ = this.channelService.fetchAll();

  data$ = combineLatest([
    this.isLoggedIn$,
    this.authUser$,
    this.channels$
  ])
    .pipe(
      map(([isLoggedIn, authUser, channels]) => ({ isLoggedIn, authUser, channels }))
    );

  logout() {
    // dirty fix
    const foundUrl = REDIRECT_TO_LOGIN.find(url => url === this.router.url);
    if (foundUrl) {
      this.router.navigate(['/auth', 'login']);
    }
    this.authService.clear();
  }

  signIn() {
    this.authService.signIn();
  }
}
