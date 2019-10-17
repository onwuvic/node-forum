import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ENVIRONMENT, Environment } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(@Inject(ENVIRONMENT) private env: Environment, private http: HttpClient) { }

  private store = new BehaviorSubject([]);
  store$ = this.store.asObservable();

  fetchAll() {
    const url = `${this.env.baseUrl}/threads`;
    return this.http.get(url)
      .pipe(
        tap(res => console.log('Data', res))
      );
  }
}
