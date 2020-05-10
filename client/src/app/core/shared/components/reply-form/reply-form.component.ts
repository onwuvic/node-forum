import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss']
})
export class ReplyFormComponent implements OnInit {
  replyForm: FormGroup;
  @Input() loading: boolean;
  @Output() replySubmit = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.replyForm = this.fb.group({
      body: ['', [Validators.required]]
    });
  }

  onReplySubmit() {
    this.replySubmit.emit(this.replyForm);
  }

}
