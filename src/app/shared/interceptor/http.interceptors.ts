import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToolsService } from '../services/tools.service';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {

  constructor(
    private tools: ToolsService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req)
      .pipe(
        catchError(err => {
          this.handleError(err, req);
          return throwError(err)
        })
      )
  }


  handleError( err: Record<any,any>, req: HttpRequest<unknown> ){
    if ( err['status'] >= 500 )
      this.tools.generateNotification( 'Сервер сейчас недоступен. \n Попробуйте позже.', true, false )

    if ( err['status'] == 400 && req.method != 'POST' )
      this.tools.generateNotification( err['error'].error || err['error'].message || 'Неправильный запрос.', true, false )

    if ( err['status'] == 403 )
      this.tools.generateNotification( 'Ошибка прав доступа.', true, false );

    if ( err['status'] == 0 )
      this.tools.generateNotification( 'Что-то пошло не так. \n Проверьте соединение.', true, false );
  }



}
