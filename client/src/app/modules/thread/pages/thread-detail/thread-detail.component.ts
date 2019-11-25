import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private replyService: ReplyService,
    private snackBar: MatSnackBar
  ) { }

  thread$ = this.route.paramMap
    .pipe(
      map(params => {
        const id = params.get('id');
        const slug = params.get('channel');
        return { id, slug };
      }),
      switchMap(data => this.threadService.fetch(data)),
      map(data => data),
      catchError(() =>  EMPTY),
    );

  authUser$ = this.authService.authUser;

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
          this.snackBar.open('Reply added!', 'Ok');
        },
        (error) => {
          console.log('----> error', error);
          this.loading = false;
          this.snackBar.open(error, 'Ok', {
            duration: 3000
          });
        }
      );
  }

  resetForm() {
    this.replyForm.reset();
  }

  deleteThread(id) {
    this.threadService.destroy(id)
      .subscribe(
        (data) => {
          this.snackBar.open(data, 'Ok');
          this.router.navigate(['/threads']);
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            duration: 3000
          });
        }
      );
  }

  favarite(id) {
    console.log('--->', id);
    this.replyService.addFavorite(id)
      .subscribe(
        (data) => {
          console.log('----> data', data);
        },
        (error) => {
          console.log('----> data', error);
          this.snackBar.open(error, 'Ok');
        }
      );
  }

  //
  canDelete() {
    // methd 1, pass parameters, not reusable
    // get auth user id
    // get thread user id
  }

}
