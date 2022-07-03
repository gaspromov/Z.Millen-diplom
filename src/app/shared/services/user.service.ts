import { Injectable } from '@angular/core';
import { BehaviorSubject, map, share, take } from 'rxjs';
import { User } from 'src/app/account/interfaces/user';
import { Requests } from 'src/app/requests';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private $user = new BehaviorSubject<User|undefined>(undefined)
  user = this.$user.asObservable().pipe()

  constructor(
    private http: HttpService
  ) { }

  getUser(){
    if ( !localStorage['accessToken'] ){
      this.$user.next(undefined)
      return
    }
    
    this.http.request(Requests['getMe'])
      .pipe(
        take(1),
        map((u: User) => {
          return { ...u, group: Number(u.group) }
        })
      )
      .subscribe(
        res => this.$user.next(res),
        err => this.$user.next(undefined)
      )
  }

  onNullUser(){
    this.$user.next(undefined)
  }
}
