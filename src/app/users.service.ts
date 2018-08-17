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
    var url = "api/User/GetUsesById";
    var params = new HttpParams();
    params = params.set('userid', userid.toString());
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { headers: headers, params:params }).pipe(
      catchError(this.handleError("getUserById"))
    );
  }

  getUsersByName(username:string){
    var url = "api/User/GetUsesByUserName";
    var params = new HttpParams();
    params = params.set('username', username);
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { headers: headers, params:params }).pipe(
      catchError(this.handleError("getUsersByName"))
    );
  }

  deleteUser(id:number){

  }


  handleError(methodname:string){
    return (e:any) =>{
      console.log("Got error when try to execute operation: "+ methodname);
      console.log(e);
      return throwError(e);
    }
  }
}
