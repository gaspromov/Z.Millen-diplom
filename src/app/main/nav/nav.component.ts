import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuth: boolean = false;

  constructor(
    private auth: AuthStateService
  ) {
    this.auth.authObs.subscribe(res => {
      this.isAuth = res
    })
  }

  ngOnInit(): void {
  }

}
