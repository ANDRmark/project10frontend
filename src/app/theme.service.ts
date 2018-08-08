import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private authenticationService:AuthenticationService) { }

  getThemes():Observable<any>{
    var url = "api/Theme/GetThemes";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, {"headers": headers}).pipe( 
      catchError((e:any) => {
        console.log("Got error when try to get /api/Forum/GetThemes");
        return of(null);
      })
    );
  }

  getTheme(id:number){
    var url = "api/Theme/GetTheme/" + id;
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, {"headers": headers}).pipe( 
      catchError((e:any) => {
        console.log("Got error when try to get api/Theme/GetTheme/");
        return of(null);
      })
    );
  }
}
