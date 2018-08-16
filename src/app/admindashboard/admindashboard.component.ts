import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { ThemeService } from '../theme.service';
import { Message, Theme } from '../models';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit, OnDestroy {

  constructor(private userService:UsersService) { }
  private ngUnsubscribe: Subject<object> = new Subject();
  users = [];
  errorMessage = " ";

  ngOnInit() {
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getUsers(username:string){
    this.users = [];
    this.userService.getUsersByName(username)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("themes")) {
          this.errorMessage = " ";
          this.users = new Array();
          this.users = data.users;
          // for (let theme of data.themes) {
          //   this.users.push({
          //     ThemeName: theme.Title,
          //     ThemeId: theme.Id,
          //     CreateDate: new Date(theme.CreateDate)
          //   });
          // }
        }
      },
        (error: any) => {
          this.errorMessage = "Error occured while getting information about themes.";
        }
      );
  }

}
export interface User{
    
}
