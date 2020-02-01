import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedThreadComponent } from './created-thread.component';

describe('CreatedThreadComponent', () => {
  let component: CreatedThreadComponent;
  let fixture: ComponentFixture<CreatedThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
