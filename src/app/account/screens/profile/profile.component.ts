import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.getMe();
  }

  getMe(){
    this.http.request(Requests['getMe'])
      .pipe(take(1))
      .subscribe(
        res => console.log(res)
      )
  }

}
