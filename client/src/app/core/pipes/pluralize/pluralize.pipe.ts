import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  transform(value: number, singularText: string, pluralText: string = null): string {
    const pluralWord = pluralText ? pluralText : `${singularText}s`;
    return value > 1 ? `${value} ${pluralWord}` : `${value} ${singularText}`;
  }

}
