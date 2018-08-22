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
    this.getUserById(this.userId);

  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goBack() {
    this.location.back();
  }

  getUserById(userid: number) {
    this.user = null;
    this.clearErrors();
    this.userService.getUserById(userid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("user") && data.user != null) {
            this.user = data.user;
        } else  {
            this.errorMessage = " User not found.  ";
          }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessage = "Invalid request; ";
            this.errorMessages = e.error.ModelState;
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
                this.errorMessage = "Error occured while deleting user.";
              }
            }
          }
        }
      );
  }

  updateUser(user){
    user.Id = this.userId;
    this.clearErrors();
    this.userService.updateUser(user)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      //all good
      this.ngOnInit();
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
              this.errorMessage = "Error occured while updating information about user.";
            }
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

  assignNewRolesClick(){
    if(this.user != null){
       //update info via theme copy, so if update fails then user can see original (previous) theme
      var usertoUpdate = JSON.parse(JSON.stringify(this.user));
      var newRoles:any[] = [];
      if(this.RoleUserCheckbox.nativeElement.checked){
        newRoles.push({Name:"User"});
      }
      if(this.RoleModeratorCheckbox.nativeElement.checked){
        newRoles.push({Name:"Moderator"});
      }
      if(this.RoleAdminCheckbox.nativeElement.checked){
        newRoles.push({Name:"Admin"});
      }
      usertoUpdate.Roles = newRoles;
      this.updateUser(usertoUpdate);
    } else{
      this.errorMessage = " Theme not found, cannt rename.";
    }
  }

  clearErrors() {
    this.errorMessage = "";
    this.errorMessages = null;
  }
}
