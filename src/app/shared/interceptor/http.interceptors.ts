import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError, switchMap } from 'rxjs';
import { ToolsService } from '../services/tools.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {

  constructor(
    private tools: ToolsService,
    private auth: AuthService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( !this.auth.needToRefreshAccessToken() || !req.headers.has('authorization') )
      return next.handle(req)
        .pipe(
          catchError(err => {
            this.handleError(err, req);
            return throwError(err)
          })
        )
    return this.auth.refreshToken()
      .pipe( 
          catchError( e => { 
              return next.handle( req ) 
          }),
          switchMap( ( w: any ) => next.handle( this.reqWithReplaceJWT( req, w.access ) ) )
      )
    return next.handle( req )

    
  }


  handleError( err: Record<any,any>, req: HttpRequest<unknown> ){
    if ( err['status'] >= 500 )
      this.tools.generateNotification( 'Сервер сейчас недоступен. \n Попробуйте позже.', true, false )

    if ( err['status'] == 400 && req.method != 'POST' )
      this.tools.generateNotification( err['error'].error || err['error'].message || 'Неправильный запрос.', true, false )

    if ( err['status'] == 403 )
      this.tools.generateNotification( 'Ошибка прав доступа.', true, false );
      
    if ( err['status'] == 401 ){
      this.tools.generateNotification( 'Ошибка авторизации.', true, false );
      this.auth.logout('/auth/login')
    }

    if ( err['status'] == 0 )
      this.tools.generateNotification( 'Что-то пошло не так. \n Проверьте соединение.', true, false );
  }


  private reqWithReplaceJWT(request: HttpRequest<any>, token: string) {
    return request.clone({
        setHeaders: {
            'Authorization': `Bearer ${token}`
        }
    });
  }

}
