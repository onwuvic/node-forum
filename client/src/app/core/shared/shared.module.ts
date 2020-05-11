import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';


import { MaterialModule } from './material-module/material.module';
import { TemplateStoreDirective } from '../directives/template-store.directive';
import { ErrorComponent } from '../error/error.component';
import { PluralizePipe } from '../pipes/pluralize/pluralize.pipe';
import { ThreadCardComponent } from './components/thread-card/thread-card.component';
import { ReplyFormComponent } from './components/reply-form/reply-form.component';
import { ReplyCardComponent } from './components/reply-card/reply-card.component';

@NgModule({
  declarations: [
    TemplateStoreDirective,
    ErrorComponent,
    PluralizePipe,
    ThreadCardComponent,
    ReplyFormComponent,
    ReplyCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    TemplateStoreDirective,
    ErrorComponent,
    PluralizePipe,
    ThreadCardComponent,
    ReplyFormComponent,
    ReplyCardComponent
  ]
})
export class SharedModule { }
