import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import{AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  getLoginResultSubscription:Subscription;

  loginResultMessage:string= " ";

  constructor(private http: HttpClient, private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.unsubscribe();
  }

  unsubscribe(){
    if(this.getLoginResultSubscription != null){
      this.getLoginResultSubscription.unsubscribe()
    }
  }

  SendLoginAndPassword(username:string, password:string){
    this.unsubscribe();
    this.loginResultMessage = "  ";
    this.getLoginResultSubscription = this.authenticationService.SendLoginAndPasswordAndStoreToken(username,password).subscribe(
      result => {
        if(result.isSuccessful){
          this.loginResultMessage = " Success ";
        } else{
          this.loginResultMessage = result.errorMessage;
        }
      }
    );
  }

}
