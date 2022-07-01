import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take, tap, throwError } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { AuthStateService } from './auth-state.service';

interface AuthData{
  access: string
  group: string,
  refresh: string
} 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService,
    private tools: ToolsService,
    private authState: AuthStateService,
    private router: Router
  ) { }

  login( data: { login: string, password: string } ){
    return this.http.request( Requests['authLogin'], data )
      .pipe(
        take(1),
        tap((d: AuthData) => this.onSuccessLogin(d)),
        catchError(err => {
          if ( err.status == 400 )
            this.tools.generateNotification(err.error?.message || 'Smth went wrong', true)
          return throwError(err)
        })
      )
  }

  private onSuccessLogin(authData: AuthData, isRefresh: boolean = false){
    localStorage.setItem('accessToken', authData.access);
    localStorage.setItem('assessTokenExpiresIn', String(new Date().getTime() + 1000*60*5))
    
    if ( isRefresh ) return
    
    // localStorage.setItem('userGroup', authData.group);
    localStorage.setItem('refreshToken', authData.refresh)
    this.authState.onChangeState(true)
  }

  
  refreshToken(){
    let refreshToken: string | null = localStorage.getItem('refreshToken');

    return this.http.request( Requests['authRefreshToken'], { refresh: refreshToken } )
      .pipe( tap( data => this.onSuccessLogin( data, true ) ) )
  }


  public needToRefreshAccessToken(): Boolean{
    if ( !localStorage['refreshToken'] ) return false

    let expiresIn = new Date(Number(localStorage['assessTokenExpiresIn'])).getTime();
    return (expiresIn < new Date().getTime()) || (!localStorage['accessToken'] && localStorage['refreshToken'])
  }

  public logout( redirectTo?: string ){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.authState.onChangeState(false);
    this.router.navigate([redirectTo || '/'])
  }
}
