import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-created-thread',
  templateUrl: './created-thread.component.html',
  styleUrls: ['./created-thread.component.scss']
})
export class CreatedThreadComponent implements OnInit {
  @Input() name: string;
  @Input() activity: any;

  constructor() { }

  ngOnInit() {
  }

}
