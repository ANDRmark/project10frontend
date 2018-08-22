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
    var url = "api/User/"+userid;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { headers: headers }).pipe(
      catchError(this.handleError("getUserById"))
    );
  }

  SearchUsersByUserNamePart(username:string){
    var url = "api/User/SearchUsersByUserNamePart";
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
    var url = "api/User/GetAll";
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

  updateUser(user){
    var url = "api/User";
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      var t = this.authenticationService.retrieveStoredAccessToken();
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    var data = user;
    return this.http.put(url, data, {headers:headers}).pipe(
      catchError(this.handleError("updateUser"))
    );
  }

  deleteUser(UserId:number){
    var url = "api/User/"+UserId;
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers = headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    headers = headers.append("Content-Type", "application/json");
    return this.http.delete<any>(url, { headers: headers }).pipe(
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
