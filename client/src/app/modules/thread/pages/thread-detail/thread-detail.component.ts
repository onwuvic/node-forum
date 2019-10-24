import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ThreadService } from '../../../../core/services/thread/thread.service';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {

  isLoggedIn$ = this.authService.isLoggedIn;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private authService: AuthService
  ) { }

  thread$ = this.route.paramMap
    .pipe(
      map(params => params.get('id')),
      switchMap(id => this.threadService.fetch(+id)),
      map(data => data),
      catchError(() =>  EMPTY),
    );

  ngOnInit() {
  }

}
