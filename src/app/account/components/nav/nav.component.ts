import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userGroup: number = 1

  constructor(
    private userService: UserService
  ) { 
    this.userService.user 
      .subscribe(res => this.userGroup = res?.group || 1)
  }

  ngOnInit(): void {
  }

}
