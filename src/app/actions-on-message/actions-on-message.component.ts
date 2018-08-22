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
import { SectionsService } from '../sections.service';

@Component({
  selector: 'app-actions-on-message',
  templateUrl: './actions-on-message.component.html',
  styleUrls: ['./actions-on-message.component.css']
})
export class ActionsOnMessageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private location: Location,
  private messageService:MessagesService) { }
  @ViewChild('NewThemeIdInput') NewThemeIdInput: ElementRef;
  private ngUnsubscribe: Subject<object> = new Subject();
  messageId: number;
  errorMessage: string = "";
  errorMessages = null;
  message = null;

  ngOnInit() {
    this.messageId = +this.route.snapshot.paramMap.get('messageId');
    this.getMessageById(this.messageId);
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  goBack() {
    this.location.back();
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
  DatetoString(datestr:Date){
    var date = new Date(datestr);
    return `${date.toISOString().split('T')[0]}   ${date.toLocaleTimeString().split(' ')[0]}`;
  }


  getMessageById(messageId:number){
    this.message = null;
    this.clearErrors();
    this.messageService.getMessageById(messageId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("message") && data.message != null) {
            this.message = data.message;
          } else{
            this.errorMessage = " Message not found  ";
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
                this.errorMessage = "Error occured while getting information about message.";
              }
            }
          }
        }
      );
  }

  updateMessage(message){
    message.Id = this.messageId;
    this.clearErrors();
    this.messageService.UpdateMessage(message)
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
          if (e.error.hasOwnProperty("Message")) {
            this.errorMessage =  e.error.Message;
          }
          else {
            this.errorMessage = "Error occured while updating updating information about messages.";
          }
        }
      }
    );
  }

  deleteMessage(messageId:number){
    this.clearErrors();
    this.messageService.DeleteMessage(messageId)
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
              this.errorMessage = "Error occured while deleting message.";
            }
          }
        }
      }
    );
  }


  movemessageClick(){
    if(this.message != null){
      //update info via theme copy, so if update fails then user can see original (previous) theme
     var messagetoUpdate = JSON.parse(JSON.stringify(this.message));
     var ThemeId = this.NewThemeIdInput.nativeElement.value;
     messagetoUpdate.ThemeId = ThemeId;
     this.updateMessage(messagetoUpdate);
   } else{
     this.errorMessage = " Message not found, cannt move to other theme.";
   }
  }

  deleteMessageClick(){
    this.deleteMessage(this.messageId);
  }
}
