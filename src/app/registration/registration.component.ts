import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationErrorMessages :any = null;
  registrationResultMessage:string= " ";
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  SendRegistrationdata(email:string, password:string, passwordconfirm:string){
    var url = "/api/Account/Register";
    var requestbody = {Email:email,Password:password,ConfirmPassword:passwordconfirm};
    this.registrationErrorMessages = null;
    this.registrationResultMessage=" ";
    this.http.post<any>(url, requestbody, { headers: {"Content-Type": "application/json"}}).pipe( 
      catchError((e:any) => {
        if(e.error.hasOwnProperty("ModelState")){
          this.registrationErrorMessages = e.error.ModelState;
          this.registrationResultMessage="Registration unsuccessful";
        } else{
          this.registrationErrorMessages = null;
          this.registrationResultMessage="Cann't register, try again later";
        }
        return of("not registered");
      })
    ).subscribe(response => {
      if(response == null ){
          this.registrationErrorMessages = null;
          this.registrationResultMessage="Success";
      }
     });
  }

  generateArray(obj){
    var errormessages = Array();
    Object.keys(obj).forEach(key=>{
      if(obj[key] instanceof Array){
        errormessages.push({ name:key, value: obj[key]})
      }
    });
    return errormessages;
 }

}
