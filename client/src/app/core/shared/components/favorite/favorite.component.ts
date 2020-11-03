import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  @Input() favoritesCount: number;
  @Input() isFavorite: boolean;
  @Output() clickFavorite = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickFavorite() {
    this.clickFavorite.emit();
  }

}
