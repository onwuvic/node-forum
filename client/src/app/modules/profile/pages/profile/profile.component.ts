import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyValue } from '@angular/common';
import { map, switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';

import { ProfileService } from '../../../../core/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) { }

  profile$ = this.route.paramMap
    .pipe(
      map(params => params.get('username')),
      switchMap(data => this.profileService.fetch(data)),
      map(data => {
        return { ...data, activities: this.groupByDate(data.activities) };
      }),
      catchError(() => EMPTY),
    );

  ngOnInit() {}

  groupByDate(data) {
    return _.groupBy(data, (result) => moment(result.createdAt, 'YYYY-MM-DDTHH:mm:ssZ').startOf('day').format());
  }

  // Order by descending property key
  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

}
