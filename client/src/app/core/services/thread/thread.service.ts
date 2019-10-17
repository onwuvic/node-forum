import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private http: HttpClient) { }

  private store = new BehaviorSubject([]);
  store$ = this.store.asObservable();

  fetchAll() {
    const url = `${environment.baseUrl}/threads`;
    return this.http.get(url)
      .pipe();
  }

  fetch(id: number) {
    const url = `${environment.baseUrl}/threads/${id}`;
    return this.http.get(url)
      .pipe();
  }
}
