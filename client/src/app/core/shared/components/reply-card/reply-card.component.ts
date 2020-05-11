import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Favorite } from '../../../models/favorite.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reply-card',
  templateUrl: './reply-card.component.html',
  styleUrls: ['./reply-card.component.scss']
})
export class ReplyCardComponent implements OnInit {
  editReplyForm: FormGroup;
  @Input() reply: any;
  @Input() data: any;
  @Output() clickFavorite = new EventEmitter();
  @Output() clickDeleteReply = new EventEmitter();
  @Output() clickUpdateReply = new EventEmitter();
  editing = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editReplyForm = this.fb.group({
      body: ['', [Validators.required]]
    });
  }

  disabled(userId: number, favorites: Favorite[]) {
    return !!favorites.find(favorite => userId === favorite.userId);
  }

  onClickFavorite() {
    this.clickFavorite.emit();
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

  /*
    1. should login and authuser be pass in as input or just get the info from the service
    2. how to make disabled not to be called for each reply card
  */

}
