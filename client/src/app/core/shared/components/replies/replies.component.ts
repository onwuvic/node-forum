import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ReplyService } from '../../../../core/services/reply/reply.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss']
})
export class RepliesComponent implements OnInit {
  @Input() replies: any;
  @Input() isLogin: boolean;
  @Input() userId: number;

  constructor(
    private replyService: ReplyService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  updateReply(replyData, replyId: number, index: number) {
    this.replyService.updateReply(replyId, replyData)
      .subscribe(
        (data) => {
          this.replies[index] = { ...this.replies[index], ...data };
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

  deleteReply(replyId: number, index: number) {
    this.replyService.deleteReply(replyId)
      .subscribe(
        (data) => {
          this.replies.splice(index, 1);
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

}
