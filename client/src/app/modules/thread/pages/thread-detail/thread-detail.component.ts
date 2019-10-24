import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ThreadService } from '../../../../core/services/thread/thread.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ReplyService } from '../../../../core/services/reply/reply.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {
  replyForm: FormGroup;
  loading = false;
  errorMessage: string;

  isLoggedIn$ = this.authService.isLoggedIn;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private replyService: ReplyService
  ) { }

  thread$ = this.route.paramMap
    .pipe(
      map(params => params.get('id')),
      switchMap(id => this.threadService.fetch(+id)),
      map(data => data),
      catchError(() =>  EMPTY),
    );

  ngOnInit() {
    this.replyForm = this.fb.group({
      body: ['', [Validators.required]]
    });
  }

  signIn() {
    // set the url
    this.authService.setRedirectUrl(this.router.url);
    // navigate to login page
    this.router.navigate(['/auth', 'login']);
  }

  sendReply(id) {
    this.loading = true;
    this.replyService.addReply(id, this.replyForm.value)
      .subscribe(
        (data) => {
          console.log('----> data', data);
          this.loading = false;
          this.resetForm();
        },
        (error) => {
          console.log('----> error', error);
          this.loading = false;
        }
      );
  }

  resetForm() {
    this.replyForm.reset();
  }

}
