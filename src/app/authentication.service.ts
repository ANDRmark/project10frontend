import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


const localStorageEntryTokenName = "AuthorizationToken";
const  tokenurl = "/api/Token";

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {

    constructor(private http: HttpClient) {}

    public isAuthenticated():boolean{
        var tokenStringified = localStorage.getItem(localStorageEntryTokenName);
        if(tokenStringified == null){ return false}

        var token = JSON.parse(tokenStringified);
        if(token != null &&
            token.access_token != null &&
            token[".expires"].getTime() > Date.now()){
            return true;
        }
        return false;
    }
    public SendLoginAndPasswordAndStoreToken(username:string, password:string):Observable<AuthenticationResult>{
        var requestbody = new URLSearchParams();
        requestbody.set('username', username);
        requestbody.set('password', password);
        requestbody.set('grant_type', "password");
        return this.http.post<any>(tokenurl, requestbody.toString(), { headers: {"Content-Type": "application/x-www-form-urlencoded"}}).pipe(
            map(response => {
                if(response != null){
                    localStorage.setItem(localStorageEntryTokenName,JSON.stringify(response));
                    return {isSuccessful:true, errorMessage:null};
                }
                return {isSuccessful:false, errorMessage:null};
               }),
            catchError((e:any) => {
                if(e.error.hasOwnProperty("error") && e.error.error == "invalid_grant"){
                    return of({isSuccessful:false, errorMessage:"Login or password is incorrect"});
                } 
                console.log(e);
                return of({isSuccessful:false, errorMessage:"Cann't login, try again later"});
              })
        );
    }
    public LogOut(){
        localStorage.removeItem(localStorageEntryTokenName);
    }

    public retrieveStoredAccessToken():string{
        var tokenStringified = localStorage.getItem(localStorageEntryTokenName);
        if(tokenStringified == null){ return null}
        return JSON.parse(tokenStringified).access_token;
    }
}

export class AuthenticationResult{
    public isSuccessful:boolean;
    public errorMessage:string;
}



