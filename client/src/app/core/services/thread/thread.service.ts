import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private http: HttpClient) { }

  private store = new BehaviorSubject([]);
  store$ = this.store.asObservable();

  fetchAll(slug = null) {
    const url = slug ? `${environment.baseUrl}/threads/${slug}` : `${environment.baseUrl}/threads`;
    return this.http.get(url)
      .pipe(
        map((res: any) => res.data)
      );
  }

  fetch(data) {
    const url = `${environment.baseUrl}/threads/${data.slug}/${data.id}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => res.data)
      );
  }

  create(thread) {
    const url = `${environment.baseUrl}/threads`;
    return this.http.post(url, thread)
      .pipe(
        map((res: any) => res.data)
      );
  }
}
