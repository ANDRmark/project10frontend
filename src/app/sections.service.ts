import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  
  getSections(): Observable<any> {
    var url = "api/Section/GetSections";
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("getSections"))
    );
  }

  getSection(id: number) {
    var url = "api/Section/GetSection/" + id;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("getSection"))
    );
  }

  sendNewSection(sectionName:string){
    var url = "api/Section/InsertNewSection";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      var t = this.authenticationService.retrieveStoredAccessToken();
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = {SectionName:sectionName}
    return this.http.post(url, data, {headers:headers}).pipe(
      catchError(this.handleError("sendNewSection"))
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
