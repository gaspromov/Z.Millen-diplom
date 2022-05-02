import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  loading: boolean = false;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, Validators.required)
    })
  }

  onLogin(){
    this.loginForm.markAllAsTouched()
    if ( this.loginForm.invalid ) return

    this.loading = true;

    this.http.request( Requests['authLogin'], this.loginForm.value )
      .pipe(take(1), finalize(() => this.loading = false))
      .subscribe(
        res => console.log(res),
        err => {}
      )
  }
}
