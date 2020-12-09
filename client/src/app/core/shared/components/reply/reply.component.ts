import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { ReplyService } from '../../../../core/services/reply/reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit, OnChanges {
  editReplyForm: FormGroup;
  @Input() reply: any;
  @Input() isLogin: boolean;
  @Input() userId: number;
  @Output() clickDeleteReply = new EventEmitter();
  @Output() clickUpdateReply = new EventEmitter();
  editing = false;
  isFavorite: boolean;

  constructor(
    private fb: FormBuilder,
    private replyService: ReplyService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.editReplyForm = this.fb.group({
      body: ['', [Validators.required]]
    });
  }

  checkIsFavorite() {
    return !!this.reply.favorites.find(favorite => this.userId === favorite.userId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reply || changes.isLogin) {
      this.isFavorite = this.checkIsFavorite();
    }
  }

  editReply(body) {
    this.editing = true;
    this.editReplyForm.patchValue({
      body
    });
  }

  onDeleteReply() {
    this.clickDeleteReply.emit();
  }

  onUpdateReply() {
    this.clickUpdateReply.emit(this.editReplyForm.value);
  }

  toggle() {
    this.isFavorite ? this.unfavoriteReply() : this.favoriteReply();
  }

  favoriteReply() {
    this.replyService.addFavorite(this.reply.id)
      .subscribe(
        (data) => {
          this.reply.favorites.push(data);
          this.isFavorite = this.checkIsFavorite();
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            panelClass: ['error']
          });
        }
      );
  }

  unfavoriteReply() {
    this.replyService.unFavorite(this.reply.id)
      .subscribe(
        (data) => {
          const foundIndex = this.reply.favorites.findIndex(favorite => favorite.id === data.favoriteId);
          if (foundIndex > -1) {
            this.reply.favorites.splice(foundIndex, 1);
          }
          this.isFavorite = this.checkIsFavorite();
        },
        (error) => {
          this.snackBar.open(error, 'Ok', {
            panelClass: ['error']
          });
        }
      );
  }

  /*
    1. should login and authuser be pass in as input or just get the info from the service
    2. how to make disabled not to be called for each reply card
  */

}
