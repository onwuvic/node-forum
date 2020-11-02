import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Favorite } from '../../../models/favorite.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  @Input() favorites: Favorite[];
  @Input() userId: number;
  @Output() clickFavorite = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  isFavorite() {
    return !!this.favorites.find(favorite => this.userId === favorite.userId);
  }

  onClickFavorite() {
     // if it favorite make a call to the api to create favorite else delete favorite
     // pass down the state of the isFavorite and allow the parent component decide what to do with that information
    this.clickFavorite.emit();
  }

}
