import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreadRoutingModule } from './thread-routing.module';
import { ThreadComponent } from './pages/thread/thread.component';
import { ThreadDetailComponent } from './pages/thread-detail/thread-detail.component';
import { SharedModule } from '../../core/shared/shared.module';
import { ThreadCreateComponent } from './pages/thread-create/thread-create.component';
import { ThreadChannelComponent } from './pages/thread-channel/thread-channel.component';

@NgModule({
  declarations: [ThreadComponent, ThreadDetailComponent, ThreadCreateComponent, ThreadChannelComponent],
  imports: [
    CommonModule,
    ThreadRoutingModule,
    SharedModule
  ]
})
export class ThreadModule { }
