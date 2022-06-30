import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  public isAuth: boolean = !!localStorage['accessToken'];
  private subj = new BehaviorSubject<boolean>(this.isAuth);
  authObs = this.subj.asObservable().pipe(share())

  constructor() { }

  public onChangeState( isAuth: boolean ){
    if ( isAuth == this.isAuth ) return
    this.isAuth = isAuth
    this.subj.next(isAuth)
  }

}
