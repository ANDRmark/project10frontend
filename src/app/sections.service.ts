import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  
  getAllSections(): Observable<any> {
    var url = "api/Section/GetAll";
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("getAllSections"))
    );
  }
  getSectionsByNamePart(sectionName:string){
    var url = "api/Section/GetSectionsByNamePart";
    var params = new HttpParams();
    params = params.set('sectionName', sectionName);
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { headers: headers, params:params }).pipe(
      catchError(this.handleError("getSectionsByNamePart"))
    );
  }

  getSection(id: number) {
    var url = "api/Section/"+id;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
      catchError(this.handleError("getSection"))
    );
  }


  sendNewSection(sectionName:string){
    var url = "api/Section";
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


  UpdateSection(sectiontoUpdate){
    var url = "api/Section";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      var t = this.authenticationService.retrieveStoredAccessToken();
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = sectiontoUpdate;
    return this.http.put(url, data, {headers:headers}).pipe(
      catchError(this.handleError("UpdateSection"))
    );
  }

  DeleteSection(sectionId:number){
    var url = "api/Section/"+sectionId;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    return this.http.delete<any>(url, { headers: headers }).pipe(
      catchError(this.handleError("DeleteSection"))
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
