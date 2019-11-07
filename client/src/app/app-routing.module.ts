import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './core/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/threads',
    pathMatch: 'full'
  },
  {
    path: 'threads',
    loadChildren: './modules/thread/thread.module#ThreadModule'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  { path: 'error/**', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
