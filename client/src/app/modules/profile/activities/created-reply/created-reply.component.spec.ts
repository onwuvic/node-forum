import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedReplyComponent } from './created-reply.component';

describe('CreatedReplyComponent', () => {
  let component: CreatedReplyComponent;
  let fixture: ComponentFixture<CreatedReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
