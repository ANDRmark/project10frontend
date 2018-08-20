import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getUserById(userid:number){
    var url = "api/User/GetUserById";
    var params = new HttpParams();
    params = params.set('userid', userid.toString());
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { headers: headers, params:params }).pipe(
      catchError(this.handleError("getUserById"))
    );
  }

  getUsersByNamePart(username:string){
    var url = "api/User/GetUsersByUserNamePart";
    var params = new HttpParams();
    params = params.set('username', username);
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { headers: headers, params:params }).pipe(
      catchError(this.handleError("getUsersByNamePart"))
    );
  }

  getAllUsers(){
    var url = "api/User/GetAllUsers";
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { headers: headers }).pipe(
      catchError(this.handleError("getUsersByName"))
    );
  }

  setRoles(UserId:number,Roles){
    var url = "api/User/SetRoles";
    var requestbody = {UserId:UserId, Roles:Roles};
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    return this.http.post<any>(url, requestbody, { headers: headers }).pipe(
      catchError(this.handleError("setRoles"))
    );
  }

  deleteUser(UserId:number){
    var url = "api/User/DeleteUser";
    var requestbody = {UserId:UserId};
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    return this.http.post<any>(url, requestbody, { headers: headers }).pipe(
      catchError(this.handleError("deleteUser"))
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
