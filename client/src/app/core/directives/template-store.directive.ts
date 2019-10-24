import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[templateStore]',
  exportAs: 'templateStore'
})
export class TemplateStoreDirective {
  [key: string]: any;

  @Input('templateStore')
  set assign(value: any) {
    if (value) {
      Object.assign(this, value);
    }
  }
}
