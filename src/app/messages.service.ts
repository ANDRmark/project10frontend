import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private authenticationService:AuthenticationService) { }


  getMessageById(id:number):Observable<any>{
    var url = "/api/Message/"+id;
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, {"headers": headers}).pipe(
      catchError(this.handleError("getMessageById"))
    );
  }

  getMessagesByThemeId(themeid:number):Observable<any>{
    var url = "/api/Message/GetMessagesByThemeId/"+themeid;
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, {"headers": headers}).pipe(
      catchError(this.handleError("getMessagesByThemeId"))
    );
  }

  sendNewMessage(themeId:number, messageBody:string){
    var url = "api/Message";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = {ThemeId:themeId,MessageBody:messageBody}
    return this.http.post(url, data, {headers:headers}).pipe(
      catchError(this.handleError("sendNewMessage"))
    );
  }

  searchMessagesByThemeandAuthorAndMessageBody(themeId: number, userName:string, messageBody:string){
    var url = "/api/Message/SearchMessages";
    var params = new HttpParams();
    params = params.append("themeId",themeId.toString());
    if(userName != null && userName != ""){
      params = params.append("userName",userName.toString());
    }
    if(messageBody != null && messageBody != ""){
      params = params.append("messageBody",messageBody.toString());
    }
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, {"headers": headers, params:params}).pipe(
      catchError(this.handleError("searchMessagesByThemeandAuthorAndMessageBody"))
    );
  }


  UpdateMessage(messagetoUpdate){
    var url = "api/Message";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      var t = this.authenticationService.retrieveStoredAccessToken();
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = messagetoUpdate;
    return this.http.put(url, data, {headers:headers}).pipe(
      catchError(this.handleError("UpdateMessage"))
    );
  }

  DeleteMessage(messageId:number){
    var url = "api/Message/"+messageId;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    return this.http.delete<any>(url, { headers: headers }).pipe(
      catchError(this.handleError("DeleteMessage"))
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
