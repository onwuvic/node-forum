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

  private favoriteReplySubject = new BehaviorSubject<Favorite>(null);
  favoriteReplyAction$ = this.favoriteReplySubject.asObservable();

  private unfavoriteReplySubject = new BehaviorSubject<any>(null);
  unfavoriteReplyAction$ = this.unfavoriteReplySubject.asObservable();

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
    this.favoriteReplyAction$,
    this.unfavoriteReplyAction$,
    this.deleteReplyAction$
  ])
    .pipe(
      map(([
        thread, reply, favoriteReply, unfavoriteReply, deleteReplyId
      ]) => this.triggerChange(thread, reply, favoriteReply, unfavoriteReply, deleteReplyId))
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

  addReply(event, id) {
    this.loading = true;
    this.replyService.addReply(id, event.value)
      .subscribe(
        (data) => {
          this.loading = false;
          event.reset();
          this.replySubject.next(data);
          this.snackBar.open('Reply added!', 'Ok', {
            panelClass: ['success']
          });
        },
        (error) => {
          this.loading = false;
          this.snackBar.open(error, 'Ok', {
            panelClass: ['error']
          });
        }
      );
  }

  updateReply(event, replyId: number) {
    this.replyService.updateReply(replyId, event)
      .subscribe(
        (data) => {
          this.replySubject.next(data);
          this.snackBar.open('Reply updated!', 'Ok', {
            panelClass: ['success']
          });
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            panelClass: ['error']
          });
        }
      );

  }

  deleteReply(replyId: number) {
    this.replyService.deleteReply(replyId)
      .subscribe(
        (data) => {
          this.deleteReplySubject.next(replyId);
          this.snackBar.open(data, 'Ok', {
            panelClass: ['success']
          });
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            panelClass: ['error']
          });
        }
      );
  }

  toggle(isFavorite, replyId) {
    isFavorite ? this.unfavoriteReply(replyId) : this.favoriteReply(replyId);
  }

  favoriteReply(id) {
    this.replyService.addFavorite(id)
      .subscribe(
        (data) => {
          this.favoriteReplySubject.next(data);
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            panelClass: ['error']
          });
        }
      );
  }

  unfavoriteReply(id) {
    this.replyService.unFavorite(id)
      .subscribe(
        (data) => {
          this.unfavoriteReplySubject.next({ replyId: id, favoriteId: data.favoriteId });
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            panelClass: ['error']
          });
        }
      );
  }

  triggerChange(thread, reply, favoriteReply, unfavoriteReply, deleteReply) {
    if (reply) {
      const foundIndex = thread.replies.findIndex(replied => replied.id === reply.id);
      if (foundIndex > -1) {
        thread.replies[foundIndex] = { ...thread.replies[foundIndex], ...reply};
      } else {
        thread.replies.unshift(reply);
      }
      this.replySubject.next(null);
      return thread;
    }
    if (favoriteReply) {
      thread.replies
        .find(replied => replied.id === favoriteReply.favorableId)
        .favorites
        .push(favoriteReply);
      this.favoriteReplySubject.next(null);
      return thread;
    }
    if (unfavoriteReply) {
      const { replyId, favoriteId } = unfavoriteReply;
      const getReply = thread.replies.find(replied => replied.id === replyId);
      const foundIndex = getReply.favorites.findIndex(favorite => favorite.id === favoriteId);
      if (foundIndex > -1) {
        getReply.favorites.splice(foundIndex, 1);
      }
      this.unfavoriteReplySubject.next(null);
      return thread;
    }
    if (deleteReply) {
      const foundIndex = thread.replies.findIndex(replied => replied.id === deleteReply);
      if (foundIndex > -1) {
        thread.replies.splice(foundIndex, 1);
      }
      this.deleteReplySubject.next(null);
      return thread;
    }
    return thread;
  }
}
