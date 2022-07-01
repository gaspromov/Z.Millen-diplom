import { Component } from '@angular/core';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';

  constructor(
    private seo: SeoService
  ){
    this.seo.autoUpdateTags()
  }
}
