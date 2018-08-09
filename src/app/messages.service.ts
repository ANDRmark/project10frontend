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

  getMessagesByThemeId(id:number):Observable<any>{
    var url = "/api/Message/GetMessagesByThemeId/"+id;
    var headers = new HttpHeaders();
    if(this.authenticationService.isAuthenticated()){
      var t = this.authenticationService.retrieveStoredAccessToken();
      headers = headers.append("Authorization","Bearer "+this.authenticationService.retrieveStoredAccessToken())
    }
    return this.http.get<any>(url, {"headers": headers});
  }
}
