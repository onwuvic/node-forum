import { Component, OnInit, Input } from '@angular/core';
import { Thread } from '../../../models/thread.model';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss']
})
export class ThreadCardComponent implements OnInit {
  @Input() thread: Thread;
  @Input() link;

  constructor() { }

  ngOnInit() {
  }

}
