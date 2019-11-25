import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

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
      map(data => data),
      catchError(() => EMPTY),
    );

  ngOnInit() {
  }

}
