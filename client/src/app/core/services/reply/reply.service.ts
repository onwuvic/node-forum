import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http: HttpClient) { }

  addReply(id: number, data) {
    const url = `${environment.baseUrl}/threads/${id}/replies`;
    return this.http.post(url, data)
      .pipe(
        map((res: any) => res.data)
      );
  }

  addFavorite(replyId: number) {
    const url = `${environment.baseUrl}/replies/${replyId}/favorites`;
    return this.http.post(url, {})
      .pipe(
        map((res: any) => res.data)
      );
  }

  unFavorite(replyId: number) {
    const url = `${environment.baseUrl}/replies/${replyId}/favorites`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => res.data)
      );
  }

  deleteReply(replyId: number) {
    const url = `${environment.baseUrl}/replies/${replyId}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => res.data)
      );
  }

  updateReply(replyId: number, data) {
    const url = `${environment.baseUrl}/replies/${replyId}`;
    return this.http.put(url, data)
      .pipe(
        map((res: any) => res.data)
      );
  }
}
