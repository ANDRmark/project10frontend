import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getThemes(): Observable<any> {
    var url = "api/Theme/GetThemes";
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("getThemes"))
    );
  }

  getTheme(id: number) {
    var url = "api/Theme/GetTheme/" + id;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("getTheme"))
    );
  }

  sendNewTheme(themeName:string){
    var url = "api/Theme/InsertNewTheme";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      var t = this.authenticationService.retrieveStoredAccessToken();
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = {ThemeName:themeName}
    return this.http.post(url, data, {headers:headers}).pipe(
      catchError(this.handleError("sendNewTheme"))
    );
  }

  handleError(methodname:string){
    return (e:any) =>{
      console.log("Got error when try to execute operation: "+ methodname);
      console.log(e);
      return throwError(e);
    }
  }
}
