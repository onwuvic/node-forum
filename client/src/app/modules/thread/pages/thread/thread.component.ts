import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../../../../core/services/thread/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor(private threadService: ThreadService) { }

  threads$ = this.threadService.fetchAll();

  ngOnInit() {
  }

}
