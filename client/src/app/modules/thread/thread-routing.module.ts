import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreadComponent } from './pages/thread/thread.component';
import { ThreadDetailComponent } from './pages/thread-detail/thread-detail.component';
import { ThreadCreateComponent } from './pages/thread-create/thread-create.component';
import { AuthenticationGuard } from '../../core/guards/authentication/authentication.guard';
import { ThreadChannelComponent } from './pages/thread-channel/thread-channel.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ThreadComponent
      },
      {
        path: 'create',
        component: ThreadCreateComponent,
        pathMatch: 'full',
        canActivate: [AuthenticationGuard],
      },
      {
        path: ':channel',
        component: ThreadChannelComponent
      },
      {
        path: ':channel/:id',
        component: ThreadDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreadRoutingModule { }

