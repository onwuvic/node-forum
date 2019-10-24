import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
