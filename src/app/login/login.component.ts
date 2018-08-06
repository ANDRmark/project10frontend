import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginResultMessage:string=' ';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  SendLoginAndPassword(username:string, password:string){
    var tokenurl = "/api/Token";
    var requestbody = new URLSearchParams();
    requestbody.set('username', username);
    requestbody.set('password', password);
    requestbody.set('grant_type', "password");
    this.loginResultMessage = " ";
    this.http.post<any>(tokenurl, requestbody.toString(), { headers: {"Content-Type": "application/x-www-form-urlencoded"}}).pipe( 
      catchError((e:any) => {
        if(e.error.hasOwnProperty("error") && e.error.error == "invalid_grant"){
          this.loginResultMessage = "Login or password is incorrect";
        } else{
          this.loginResultMessage = "Cann't login, try again later";
        }
        return of(null);
      })
    ).subscribe(response => {
      if(response != null && response.hasOwnProperty("access_token")){
          sessionStorage.setItem("access_token", response.access_token);
          this.loginResultMessage = " Success ";
      }
     });
  }

}
