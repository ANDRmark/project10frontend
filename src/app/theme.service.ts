import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  GetThemesBySection(id: number): Observable<any> {
    var url = "api/Theme/GetThemesBySection/"+id;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("getThemes"))
    );
  }

  
  GetAllThemes(): Observable<any> {
    var url = "api/Theme/GetAllThemes";
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("GetAllThemes"))
    );
  }

  getTheme(id: number) {
    var url = "api/Theme/GetTheme/" + id;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("getTheme"))
    );
  }

  searchThemesByNamePart(namePart:string){
    var url = "api/Theme/SearchThemesByNamePart";
    var params = new HttpParams();
    params = params.append("namePart",namePart);
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers, params:params }).pipe(
      catchError(this.handleError("GetAllThemes"))
    );
  }

  sendNewTheme(sectionId:number,themeName:string){
    var url = "api/Theme/InsertNewTheme";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      var t = this.authenticationService.retrieveStoredAccessToken();
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = {ThemeName:themeName, SectionId:sectionId}
    return this.http.post(url, data, {headers:headers}).pipe(
      catchError(this.handleError("sendNewTheme"))
    );
  }

  UpdateTheme(themetoUpdate){
    var url = "api/Theme/UpdateTheme";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      var t = this.authenticationService.retrieveStoredAccessToken();
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = themetoUpdate;
    return this.http.post(url, data, {headers:headers}).pipe(
      catchError(this.handleError("UpdateTheme"))
    );
  }

  DeleteTheme(themeId:number){
    var url = "api/Theme/DeleteTheme";
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = {ThemeId:themeId};
    return this.http.post<any>(url, data, { headers: headers }).pipe(
      catchError(this.handleError("DeleteTheme"))
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
