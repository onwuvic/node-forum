import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Thread } from '../../models/thread.model';

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

  fetchAll(options: Partial<APIListRequestOptions> = {}): Observable<Thread[]> {
    const url = options.slug ? `${environment.baseUrl}/threads/${options.slug}` : `${environment.baseUrl}/thread`;
    const params = options.filter;

    return this.http.get<Thread[]>(url, { params })
      .pipe(
        map((res: any) => res.data)
      );
  }

  fetch(data): Observable<Thread> {
    const url = `${environment.baseUrl}/threads/${data.slug}/${data.id}`;
    return this.http.get<Thread>(url)
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

  destroy(id) {
    const url = `${environment.baseUrl}/threads/${id}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => res.data)
      );
  }
}
