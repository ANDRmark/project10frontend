import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private authenticationService:AuthenticationService) { }

  getMessages(id:number):Observable<any>{
    var url = "/api/Forum/GetMessages/"+id;
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated){
      headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, {"headers": headers}).pipe( 
      catchError((e:any) => {
        console.log("Got error when try to get /api/Forum/GetThemes");
        return of(null);
      })
    );
  }
}
