import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regForm!: FormGroup

  loading: boolean = false;

  repeatedPassword = new FormControl(null, Validators.required)

  constructor(
    private auth: AuthService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm(){
    this.regForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      sirname: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  onRegistr(){
    this.regForm.markAsTouched();

    if (this.regForm.invalid) return

    // временно
    return

    this.loading = true;

    this.http.request(Requests['authRegistr'], this.regForm.value)
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe()
  }
}
