import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EMPTY, combineLatest, Subject } from 'rxjs';
import { map, switchMap, catchError} from 'rxjs/operators';

import { ThreadService } from '../../../../core/services/thread/thread.service';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadDetailComponent implements OnInit {
  editReplyForm: FormGroup;
  loading = false;
  editing = false;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
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
      catchError((error) => {
        this.errorMessageSubject.next(error);
        return EMPTY;
      }),
    );

  authUser$ = this.authService.authUser;

  data$ = combineLatest([
    this.isLoggedIn$,
    this.authUser$,
    this.thread$
  ])
    .pipe(
      map(([isLoggedIn, authUser, thread]) => ({ isLoggedIn, authUser, thread }))
    );

  ngOnInit() {
    this.editReplyForm = this.fb.group({
      body: ['', [Validators.required]]
    });
  }

  signIn() {
    this.authService.signIn();
  }

  deleteThread(id) {
    this.threadService.destroy(id)
      .subscribe(
        (data) => {
          this.snackBar.open(data, 'Ok', {
            panelClass: ['success']
          });
          this.router.navigate(['/threads']);
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            panelClass: ['error']
          });
        }
      );
  }
}
