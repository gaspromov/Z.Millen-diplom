import { Injectable } from '@angular/core';
import { catchError, take, tap, throwError } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToolsService } from 'src/app/shared/services/tools.service';

interface AuthData{
  access: string
  group: string
} 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService,
    private tools: ToolsService
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

  private onSuccessLogin(authData: AuthData){
    localStorage.setItem('accessToken', authData.access);
    localStorage.setItem('userGroup', authData.group)
  }
}
