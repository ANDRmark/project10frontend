import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription,Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import {Router} from "@angular/router";
import{AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<object> = new Subject();

  loginResultMessage:string= " ";

  constructor(
    private http: HttpClient,
    private authenticationService:AuthenticationService,
    private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.
    pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        if(data != null && data.hasOwnProperty("logout") && data.logout == true){
        this.authenticationService.LogOut();
      }
    });
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



  SendLoginAndPassword(username:string, password:string, rememberMe:boolean){
    this.loginResultMessage = "  ";
    this.authenticationService.SendLoginAndPasswordAndStoreToken(username,password,rememberMe)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      result => {
        if(result.isSuccessful){
          this.loginResultMessage = " Success ";
          this.router.navigate(['/']);
        } else{
          this.loginResultMessage = result.errorMessage;
        }
      },
      (error:any) => {
        this.loginResultMessage = "Something went wromg";
      }
    );
  }


}
