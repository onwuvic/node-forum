import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

export interface ThreadOptions {
  slug?: string;
  filter?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private http: HttpClient) { }

  private store = new BehaviorSubject([]);
  store$ = this.store.asObservable();

  fetchAll(option: ThreadOptions = { slug: null, filter: null }) {
    const url = option.slug ? `${environment.baseUrl}/threads/${option.slug}` : `${environment.baseUrl}/threads`;
    const params = option.filter ? { by: option.filter } : {};

    return this.http.get(url, { params })
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
