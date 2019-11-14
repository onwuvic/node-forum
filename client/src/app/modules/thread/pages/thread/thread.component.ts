import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { ThreadService } from '../../../../core/services/thread/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor(
    private threadService: ThreadService,
    private route: ActivatedRoute,
  ) { }

  threads$ = this.route.queryParams
    .pipe(
      map(data => data),
      switchMap(data => this.threadService.fetchAll({ filter: data })),
      map(data => data),
      catchError(() => EMPTY),
    );

  ngOnInit() { }

}
