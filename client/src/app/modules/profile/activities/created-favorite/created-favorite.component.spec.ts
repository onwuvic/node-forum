import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedFavoriteComponent } from './created-favorite.component';

describe('CreatedFavoriteComponent', () => {
  let component: CreatedFavoriteComponent;
  let fixture: ComponentFixture<CreatedFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
