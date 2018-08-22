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

  constructor(
    private userService: UsersService,
    private route:ActivatedRoute) { }
  private ngUnsubscribe: Subject<object> = new Subject();
  users: User[] = null;
  errorMessage = " ";
  errorMessages: any;
  currentUrl:string;
  @ViewChild('UserNameInput') UserNameInput: ElementRef;
  @ViewChild('IdInput') IdInput: ElementRef;

  ngOnInit() {
    this.currentUrl=this.route.snapshot['_routerState'].url;
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getUsersByName(username: string) {
    this.users = null;
    this.clearErrors();
    this.userService.SearchUsersByUserNamePart(username)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("users")) {
          this.users = data.users;
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
    this.users = null;
    this.clearErrors();
    this.userService.getUserById(userid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("user")) {
          if(data.user != null){
            this.users = [data.user];
          } else{
            this.users = [];
          }
        }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessage = "Invalid request; ";
            this.errorMessages = e.error.ModelState;
          }
          else {
            if (e.hasOwnProperty("status") && e.status == 404) {
              this.errorMessage = "Invalid request,  id is not correct;";
            }
            else {
              if (e.error.hasOwnProperty("Message")) {
                this.errorMessage = e.error.Message;
              }
              else {
                this.errorMessage = "Error occured while getting information about user.";
              }
            }
          }
        }
      );
  }

  getAllUsers() {
    this.users = [];
    this.clearErrors();
    this.userService.getAllUsers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("users")) {
          this.users = data.users;
        }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessage = "Invalid request; ";
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
  GetAllClick(){
    this.getAllUsers();
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
