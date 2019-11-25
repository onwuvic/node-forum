import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  fetch(username: string) {
    const url = `${environment.baseUrl}/profiles/${username}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => res.data)
      );
  }
}
