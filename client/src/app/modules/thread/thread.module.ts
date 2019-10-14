import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { ThreadRoutingModule } from './thread-routing.module';
import { ThreadComponent } from './pages/thread/thread.component';
import { ThreadDetailComponent } from './pages/thread-detail/thread-detail.component';

@NgModule({
  declarations: [ThreadComponent, ThreadDetailComponent, HomeComponent],
  imports: [
    CommonModule,
    ThreadRoutingModule
  ]
})
export class ThreadModule { }
