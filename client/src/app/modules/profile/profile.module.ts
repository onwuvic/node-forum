import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from '../../core/shared/shared.module';
import { CreatedThreadComponent } from './activities/created-thread/created-thread.component';
import { CreatedReplyComponent } from './activities/created-reply/created-reply.component';
import { CreatedFavoriteComponent } from './activities/created-favorite/created-favorite.component';

@NgModule({
  declarations: [ProfileComponent, CreatedThreadComponent, CreatedReplyComponent, CreatedFavoriteComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
