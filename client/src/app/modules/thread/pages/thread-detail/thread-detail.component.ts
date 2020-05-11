import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EMPTY, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, switchMap, catchError} from 'rxjs/operators';

import { ThreadService } from '../../../../core/services/thread/thread.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ReplyService } from '../../../../core/services/reply/reply.service';
import { Reply } from '../../../../core/models/reply.model';
import { Favorite } from '../../../../core/models/favorite.model';

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

  private replySubject = new BehaviorSubject<Reply>(null);
  replyAction$ = this.replySubject.asObservable();

  private favoriteSubject = new BehaviorSubject<Favorite>(null);
  favoriteAction$ = this.favoriteSubject.asObservable();

  private deleteReplySubject = new BehaviorSubject<number>(null);
  deleteReplyAction$ = this.deleteReplySubject.asObservable();

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
      catchError((error) => {
        this.errorMessageSubject.next(error);
        return EMPTY;
      }),
    );

  authUser$ = this.authService.authUser;

  threadWithActions$ = combineLatest([
    this.thread$,
    this.replyAction$,
    this.favoriteAction$,
    this.deleteReplyAction$
  ])
    .pipe(
      map(([
        thread, reply, favorite, deleteReplyId
      ]) => this.triggerChange(thread, reply, favorite, deleteReplyId))
    );

  data$ = combineLatest([
    this.isLoggedIn$,
    this.authUser$,
    this.threadWithActions$
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

  addReply(event, id) {
    this.loading = true;
    this.replyService.addReply(id, event.value)
      .subscribe(
        (data) => {
          this.loading = false;
          event.reset();
          this.replySubject.next(data);
          this.snackBar.open('Reply added!', 'Ok', {
            duration: 3000
          });
        },
        (error) => {
          this.loading = false;
          this.snackBar.open(error, 'Ok', {
            duration: 3000
          });
        }
      );
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

  triggerChange(thread, reply, favorite, deleteReplyId) {
    if (reply) {
      const foundIndex = thread.replies.findIndex(replied => replied.id === reply.id);
      if (foundIndex > -1) {
        thread.replies[foundIndex] = { ...thread.replies[foundIndex], ...reply};
      } else {
        thread.replies.unshift(reply);
      }
      this.replySubject.next(null);
    }
    if (favorite) {
      thread.replies
        .find(replied => replied.id === favorite.favorableId)
        .favorites
        .push(favorite);
    }
    if (deleteReplyId) {
      const foundIndex = thread.replies.findIndex(replied => replied.id === deleteReplyId);
      if (foundIndex > -1) {
        thread.replies.splice(foundIndex, 1);
      }
    }
    return thread;
  }

  addFavorite(id) {
    this.replyService.addFavorite(id)
      .subscribe(
        (data) => {
          this.favoriteSubject.next(data);
        },
        (error) => {
          this.snackBar.open(error, 'Ok');
        }
      );
  }

  updateReply(event, replyId: number) {
    this.replyService.updateReply(replyId, event)
      .subscribe(
        (data) => {
          this.replySubject.next(data);
          this.snackBar.open('Reply updated!', 'Ok');
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            duration: 3000
          });
        }
      );

  }

  deleteReply(replyId: number) {
    this.replyService.deleteReply(replyId)
      .subscribe(
        (data) => {
          this.deleteReplySubject.next(replyId);
          this.snackBar.open(data, 'Ok');
        },
        (error) => {
          this.snackBar.open(error, 'Ok');
        }
      );
  }
}
