import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReqData } from '../requests';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  
  request( reqParams: ReqData, body: any = null, urlParam: string = '', queryParams: string = '' ): Observable<any> {

    // собираем реквестУрл
    let reqUrl = this.apiUrl + reqParams.url + queryParams;

    // устанавливаем параметр в урл
    if ( reqUrl.includes( ':param' ) ) reqUrl = reqUrl.replace( ':param', urlParam == 'null' ? '' : urlParam );

    // устанавливаем соответсвующий авторизационный хэдер
    let headers = new HttpHeaders();
    if ( reqParams.authType == 'jwt' )
      headers = headers.set('authorization', `Bearer ${localStorage.getItem('accessToken')}`)

    return this.getHttpReq( reqUrl, body, reqParams.method, headers )
      

  }

  

  private postData( reqUrl: string, data: any, headers: HttpHeaders   ){
    return this.http.post( reqUrl, data, { headers: headers } )
  }

  private putData( reqUrl: string, data: any, headers: HttpHeaders ){
    return this.http.put( reqUrl, data, { headers: headers } )
  }

  private getData( reqUrl: string, headers: HttpHeaders ){
    return this.http.get( reqUrl, { headers: headers } );
  }

  private deleteData( reqUrl: string, data: any, headers: HttpHeaders ){
    let opt = {
      headers: headers,
      body: data || null
    }
    return this.http.delete( reqUrl, opt )
  }

  private patchData( reqUrl: string, data: any, headers: HttpHeaders ){
    return this.http.patch( reqUrl, data || undefined, { headers: headers } )
  }


  private getHttpReq(reqUrl: string, body: any, method: string, headers: HttpHeaders){
    switch ( method ) {
      case 'POST': return this.postData( reqUrl, body, headers )
      case 'GET': return this.getData( reqUrl, headers )
      case 'PUT': return this.putData( reqUrl, body, headers )
      case 'PATCH': return this.patchData( reqUrl, body, headers )
      case 'DELETE': return this.deleteData( reqUrl, body, headers )
      default: {
        alert( 'Error getting request method' )
        return this.getData( reqUrl, headers )
      }
    }

  }

}
