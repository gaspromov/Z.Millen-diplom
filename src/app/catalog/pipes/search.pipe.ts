import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Product[], property: string, param: string|number|undefined, fullMatch: boolean ): Product[] {
    console.log( param, property ) 
    if ( !property || !param) return items
    
    return items.filter( i => 
      // @ts-ignore
      fullMatch ? i[property] == param : i[property].toLowerCase().indexOf(param.toLowerCase()) === 0
    )

  }

}
