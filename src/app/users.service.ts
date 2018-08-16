import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getUserById(){

  }

  getUsersByName(username:string){
    var url = "api/User/GetUsesByUsername";
    var headers = new HttpHeaders();
    if (this.authenticationService.isAuthenticated()) {
      headers.append("Authorization", "Bearer " + this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, { "headers": headers }).pipe(
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
