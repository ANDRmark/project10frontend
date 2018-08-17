import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { ThemeService } from '../theme.service';
import { Message, Theme, User, Role } from '../models';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit, OnDestroy {

  constructor(private userService: UsersService) { }
  private ngUnsubscribe: Subject<object> = new Subject();
  users: User[] = [];
  errorMessage = " ";
  errorMessages: any;
  @ViewChild('UserNameInput') UserNameInput: ElementRef;
  @ViewChild('IdInput') IdInput: ElementRef;

  ngOnInit() {
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getUsersByName(username: string) {
    this.users = [];
    this.clearErrors();
    this.userService.getUsersByName(username)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("users")) {
          this.users = new Array();
          for (let user of data.users) {
            var roles: Role[] = [];
            for (let role of user.Roles) {
              roles.push({ Id: role.Id, Name: role.Name });
            }
            this.users.push({
              UserName: user.UserName,
              Email: user.Email,
              Id: user.Id,
              Roles: roles
            });
          }
        }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessages = e.error.ModelState;
          }
          else {
            this.errorMessages = null;
          }
          if (e.error.hasOwnProperty("Message")) {
            this.errorMessage = e.error.Message;
          }
          else {
            this.errorMessage = "Error occured while getting information about users.";
          }
        }
      );
  }

  getUsersById(userid: number) {
    this.users = [];
    this.clearErrors();
    this.userService.getUserById(userid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("users")) {
          this.users = new Array();
          for (let user of data.users) {
            var roles: Role[] = [];
            for (let role of user.Roles) {
              roles.push({ Id: role.Id, Name: role.Name });
            }
            this.users.push({
              UserName: user.UserName,
              Email: user.Email,
              Id: user.Id,
              Roles: roles
            });
          }
        }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessage = "Invalid argument for Id; ";
          }
          else {
            if (e.error.hasOwnProperty("Message")) {
              this.errorMessage = e.error.Message;
            }
            else {
              this.errorMessage = "Error occured while getting information about users.";
            }
          }
        }
      );
  }
  SearchByNameClick() {
    var namesearchstr = this.UserNameInput.nativeElement.value;
    this.getUsersByName(namesearchstr);
  }
  SearchByIdClick() {
    var userid: number = this.IdInput.nativeElement.value;
    this.getUsersById(userid);
  }

  generateErrorMessagesArray(obj) {
    var errormessages = Array();
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Array) {
        errormessages.push({ name: key, value: obj[key] })
      }
    });
    return errormessages;
  }

  clearErrors() {
    this.errorMessage = "";
    this.errorMessages = null;
  }

}
