import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';


import { MaterialModule } from './material-module/material.module';
import { TemplateStoreDirective } from '../directives/template-store.directive';
import { ErrorComponent } from '../error/error.component';

@NgModule({
  declarations: [TemplateStoreDirective, ErrorComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    TemplateStoreDirective,
    ErrorComponent
  ]
})
export class SharedModule { }
