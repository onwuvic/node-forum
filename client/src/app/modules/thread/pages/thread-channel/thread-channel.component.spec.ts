import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadChannelComponent } from './thread-channel.component';

describe('ThreadChannelComponent', () => {
  let component: ThreadChannelComponent;
  let fixture: ComponentFixture<ThreadChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
