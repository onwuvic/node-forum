import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

import { ThreadService } from '../../../../core/services/thread/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadComponent implements OnInit {
  page: number = 1;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(
    private threadService: ThreadService,
    private route: ActivatedRoute,
  ) { }

  threads$ = this.route.queryParams
    .pipe(
      map(data => data),
      switchMap(data => this.threadService.fetchAll({ filter: data })),
      map(data => data),
      catchError((error) => {
        // because of the change detection the error message isn't changing
        // because the component now only detect reactive changes.
        // e.g @input, event emits, a bound observable emit
        // our error message isn't any of this. we will change it to an observable
        this.errorMessageSubject.next(error);
        return EMPTY;
      }),
    );

  ngOnInit() { }

  pageChanged(currentPage) {
    this.page = currentPage;
    window.scrollTo(0,0);
  }

}
