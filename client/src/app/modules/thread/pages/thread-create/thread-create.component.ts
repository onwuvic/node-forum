import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ThreadService } from '../../../../core/services/thread/thread.service';
import { ChannelService } from '../../../../core/services/channel/channel.service';


@Component({
  selector: 'app-thread-create',
  templateUrl: './thread-create.component.html',
  styleUrls: ['./thread-create.component.scss']
})
export class ThreadCreateComponent implements OnInit {
  loading = false;
  threadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private threadService: ThreadService,
    private router: Router,
    private snackBar: MatSnackBar,
    private channelService: ChannelService
  ) { }

  channels$ = this.channelService.fetchAll();

  ngOnInit() {
    this.threadForm = this.fb.group({
      channelId: ['', [Validators.required]],
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  createThread() {
    this.loading = true;
    this.threadService.create(this.threadForm.value)
      .subscribe(
        (data) => {
          console.log('----> data', data);
          this.loading = false;
          this.snackBar.open('Thread Created!', 'Ok');
          this.router.navigate(['/threads', data.id]);
        },
        (error) => {
          this.loading = false;
          console.log('-----> error', error);
          this.snackBar.open(error, 'Ok');
        }
      );

  }

}
