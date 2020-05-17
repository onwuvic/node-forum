import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

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
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule'
  },
  { path: 'error/**', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
