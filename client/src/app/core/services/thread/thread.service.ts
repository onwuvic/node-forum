import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

export interface APIFilterOption {
  [key: string]: string | string[];
}

export interface APIListRequestOptions {
  slug?: string;
  filter?: APIFilterOption;
}

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private http: HttpClient) { }

  private store = new BehaviorSubject([]);
  store$ = this.store.asObservable();

  fetchAll(options: Partial<APIListRequestOptions> = {}) {
    const url = options.slug ? `${environment.baseUrl}/threads/${options.slug}` : `${environment.baseUrl}/threads`;
    const params = options.filter;

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
