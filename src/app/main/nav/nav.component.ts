import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuth: boolean = false;


  userGroup: number = 1;

  constructor(
    private auth: AuthStateService,
    private userService: UserService
  ) {
    this.auth.authObs.subscribe(res => {
      this.isAuth = res
    })

    this.userService.user 
      .subscribe(res => this.userGroup = res?.group || 1)
  }

  ngOnInit(): void {
  }

}
