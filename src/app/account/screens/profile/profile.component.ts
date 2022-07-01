import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  profile: any
  apiUrl = environment.apiUrl

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getMe();
  }

  getMe(){
    this.spinner.show();
    this.loading = true;
    this.http.request(Requests['getMe'])
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide()
        })
      )
      .subscribe(
        res => this.profile = res
      )
  }

}
