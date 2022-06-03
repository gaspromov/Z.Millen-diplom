import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, AbstractControl, Validators } from '@angular/forms';
import { Subscription, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss']
})
export class PasswordControlComponent implements OnInit, OnDestroy {
  @Input('control') passControl!: FormControl | AbstractControl

  @Input() placeholder: string = '';

  control = new FormControl(null, Validators.required)
  passInputType: 'text'|'password' = 'password'

  sub!: Subscription;

  constructor() { }

  ngOnInit(): void {

    this.sub = this.control.valueChanges.pipe(distinctUntilChanged())
      .subscribe(res => {
        this.passControl.setValue(res, { emitEvent: false })
        this.passControl.markAsTouched();
      })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }


}
