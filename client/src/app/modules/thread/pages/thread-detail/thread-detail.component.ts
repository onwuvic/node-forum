import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ThreadService } from '../../../../core/services/thread/thread.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private threadService: ThreadService) { }

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
