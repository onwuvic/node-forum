import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadCreateComponent } from './thread-create.component';

describe('ThreadCreateComponent', () => {
  let component: ThreadCreateComponent;
  let fixture: ComponentFixture<ThreadCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
