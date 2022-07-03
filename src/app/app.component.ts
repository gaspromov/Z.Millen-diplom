import { Component } from '@angular/core';
import { SeoService } from './shared/services/seo.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';

  constructor(
    private seo: SeoService,
    private userService: UserService
  ){
    this.seo.autoUpdateTags()
    this.userService.getUser()
  }
}
