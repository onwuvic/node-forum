import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module/material.module';
import { MomentModule } from 'ngx-moment';
import { TemplateStoreDirective } from '../directives/template-store.directive';

@NgModule({
  declarations: [TemplateStoreDirective],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    TemplateStoreDirective
  ]
})
export class SharedModule { }
