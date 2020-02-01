import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-created-reply',
  templateUrl: './created-reply.component.html',
  styleUrls: ['./created-reply.component.scss']
})
export class CreatedReplyComponent implements OnInit {
  @Input() name: string;
  @Input() activity: any;

  constructor() { }

  ngOnInit() {
  }

}
