import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform( items: Product[], property: string|undefined, ascend: boolean ): Product[] {
    if ( !property || property == 'undefined' ) return items
    // @ts-ignore
    return items.sort((a,b) => (ascend ? 1 : -1) * (a[property] - b[property]))
  }

}
