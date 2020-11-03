import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { JwtHelperService } from '../jwt-helper/jwt-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectUrl: string;

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private router: Router,
  ) { }

  private loggedInSubject = new BehaviorSubject<boolean>(false);

  // think of a better way to implement this
  get isLoggedIn$() {
    this.loggedInSubject.next(this.isAuthenticated());
    return this.loggedInSubject.asObservable();
  }

  private authUserSub = new BehaviorSubject(null);

  get authUser() {
    this.authUserSub.next(this.formatUser(this.jwt.decodeToken()));
    return this.authUserSub.asObservable();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.jwt.isTokenExpired();
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  clear(): void {
    this.loggedInSubject.next(false);
    localStorage.clear();
  }

  signIn() {
    // set the url
    this.setRedirectUrl(this.router.url);
    // navigate to login page
    this.router.navigate(['/auth', 'login']);
  }

  formatUser(user) {
    if (user) {
      return user.userObject;
    }
    return user;
  }

  authenticate(user: {email: string, password: string }): Observable<any> {
    const url = `${environment.baseUrl}/auth/login`;
    return this.http.post(url, user)
      .pipe(
        map((res: any) => res.data),
        tap(data => {
          localStorage.setItem('token', data.token);
          this.authUserSub.next(this.formatUser(this.jwt.decodeToken(data.token)));
          this.loggedInSubject.next(true);
        })
      );
  }
}
