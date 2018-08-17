import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { MessagesService } from '../messages.service';
import { AuthenticationService } from '../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Message, Theme } from '../models';
import { catchError, map, tap } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-actions-on-user',
  templateUrl: './actions-on-user.component.html',
  styleUrls: ['./actions-on-user.component.css']
})
export class ActionsOnUserComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public userService: UsersService) { }

  @ViewChild('RoleUserCheckbox') RoleUserCheckbox: ElementRef;
  @ViewChild('RoleModeratorCheckbox') RoleModeratorCheckbox: ElementRef;
  @ViewChild('RoleAdminCheckbox') RoleAdminCheckbox: ElementRef;
  private ngUnsubscribe: Subject<object> = new Subject();
  userId: number;
  errorMessage: string = "";
  errorMessages = null;
  user = null;

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('userId');
    this.getUsersById(this.userId);

  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goBack() {
    this.location.back();
  }

  getUsersById(userid: number) {
    this.user = null;
    this.clearErrors();
    this.userService.getUserById(userid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("users")) {
          if (data.users.length == 1) {
            this.user = data.users[0];
          } else if (data.users.length > 1) {
            this.errorMessage = "Error, more than one user found.  ";
          } else if (data.users.length == 0) {
            this.errorMessage = " User not found.  ";
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
              this.errorMessage = "Error occured while getting information about user.";
            }
          }
        }
      );
  }

  isUserInRole(roleName: string): boolean {
    if (this.user != null &&
      this.user.Roles != null &&
      this.user.Roles.findIndex(r => r.Name == roleName) >= 0) return true;
    return false;
  }

  applyRoles() {
    var roles = {
      IsUser: this.RoleUserCheckbox.nativeElement.checked,
      IsModerator: this.RoleModeratorCheckbox.nativeElement.checked,
      IsAdmin: this.RoleAdminCheckbox.nativeElement.checked,
    }
    this.clearErrors();
    this.userService.setRoles(this.userId, roles)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        //all good
        this.ngOnInit();
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessages = e.error.ModelState;
            this.errorMessage = "Request is invalid; ";
          }
          else {
            if (e.error.hasOwnProperty("Message")) {
              this.errorMessage = e.error.Message;
            }
            else {
              this.errorMessage = "Error occured while assigning new roles to user";
            }
          }
        }
      );;
  }

  deleteUser(){
    this.clearErrors();
    this.userService.deleteUser(this.userId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        //all good
        this.ngOnInit();
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessages = e.error.ModelState;
            this.errorMessage = "Request is invalid; ";
          }
          else {
            if (e.error.hasOwnProperty("Message")) {
              this.errorMessage = e.error.Message;
            }
            else {
              this.errorMessage = "Error occured while deleting user";
            }
          }
        }
      );
  }

  generateErrorMessagesArray(obj) {
    if (obj == null) return [];
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
