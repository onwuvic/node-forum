import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-created-favorite',
  templateUrl: './created-favorite.component.html',
  styleUrls: ['./created-favorite.component.scss']
})
export class CreatedFavoriteComponent implements OnInit {
  @Input() name: string;
  @Input() activity: any;

  constructor() { }

  ngOnInit() {
  }

}
