import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  baseUrl = 'rentoo.com'

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  autoUpdateTags(){
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.changeUrl( this.router.url );
        this.changeTitle( event['title'] );
        this.changeDescription( event['descript'] || '' )
      }); 
  }
  
  changeUrl(url: string){
    url = this.baseUrl + url;
    // this.meta.updateTag({property: 'og:url', content: url});
    this.meta.updateTag({name: 'url', content: url});
  }

  changeTitle( title?: any ){
    title = title ? title + ' - Rentoo' : 'Rentoo';

    this.title.setTitle(title);
    this.meta.updateTag( { name: 'title', content: title } )
    this.meta.updateTag( { property: 'og:title', content: title } )
  }

  changeDescription( descript: string ){
    if ( !descript ) return;
    this.meta.updateTag( { name: 'description', content: descript } )
    // this.meta.updateTag( { property: 'og:description', content: descript } )
  }
}
