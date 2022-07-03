import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthService } from '../../services/auth.service';

enum ruEnGroups{
  'operator' = 'оператор',
  'shop owner' = 'магазин',
}


enum NumGroups {
  'оператор' = 2,
  'магазин' = 3,
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regForm!: FormGroup

  loading: boolean = false;

  // password_confirm = new FormControl(null, Validators.required)

  groupName: string | undefined;

  constructor(
    private auth: AuthService,
    private http: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.groupName = this.activatedRoute.snapshot.params['group']
    if ( !this.groupName ) return;
    // @ts-ignore
    this.groupName = ruEnGroups[this.groupName.split('-').join(' ')];
  }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm(){
    this.regForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password_confirm: new FormControl(null, Validators.required),
      // @ts-ignore
      group: new FormControl( this.groupName ? NumGroups[this.groupName] : 1)
    })
  }

  onRegistr(){
    this.regForm.markAsTouched();

    if (this.regForm.invalid) return

    this.loading = true;

    this.http.request(Requests['authRegistr'], this.regForm.value)
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        this.router.navigate(['/auth/login'])
      })
  }
}
