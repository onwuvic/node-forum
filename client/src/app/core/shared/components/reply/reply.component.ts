import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  @Output() clickFavorite = new EventEmitter();
  @Output() clickDeleteReply = new EventEmitter();
  @Output() clickUpdateReply = new EventEmitter();
  editing = false;
  isFavorite: boolean;

  constructor(private fb: FormBuilder) { }

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

  onClickFavorite() {
    this.clickFavorite.emit(this.isFavorite);
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
