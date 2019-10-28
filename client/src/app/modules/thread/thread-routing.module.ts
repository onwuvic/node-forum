import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreadComponent } from './pages/thread/thread.component';
import { ThreadDetailComponent } from './pages/thread-detail/thread-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ThreadCreateComponent } from './pages/thread-create/thread-create.component';
import { AuthenticationGuard } from '../../core/guards/authentication/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
        path: ':id',
        component: ThreadDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreadRoutingModule { }

