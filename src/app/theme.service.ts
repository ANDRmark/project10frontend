import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {CustomAuthenticationChecker} from './authenticationChecker';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getThemes():Observable<any>{
    var url = "/api/Forum/GetThemes";
    var headers = new HttpHeaders();
    var checkResult = CustomAuthenticationChecker.checkAuthentication();
    if(checkResult.isAuthenticated){
      headers.append("Authorization","Bearer "+checkResult.access_token)
    }
    return this.http.get<any>(url, {"headers": headers}).pipe( 
      catchError((e:any) => {
        console.log("Got error when try to get /api/Forum/GetThemes");
        return of(null);
      })
    );
  }
}
