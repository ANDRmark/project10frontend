import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of  } from 'rxjs';
import {MessagesService} from '../messages.service';
import {AuthenticationService} from '../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Message, Theme} from '../models';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.css']
})
export class AddNewMessageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private messageService: MessagesService,
    public authenticationService:AuthenticationService,
    private location:Location) { }

  private ngUnsubscribe: Subject<object> = new Subject();
  theme: Theme = null;
  themeId:number;
  errorMessage:string = " ";

  ngOnInit() {
    this.themeId = +this.route.snapshot.paramMap.get('themeId');
    this.getTheme();
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTheme() {
    this.themeService.getTheme(this.themeId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("theme")) {
          this.theme = {
            ThemeName: data.theme.Title,
            ThemeId: data.theme.Id,
            CreateDate: new Date(data.theme.CreateDate)
          };
        }
      },
        (error: any) => {
          this.errorMessage += "  Error occured while getting information abouth theme. ";
        });
  }

  CreateNewMessage(messageBody:string){
    this.messageService.sendNewMessage(this.themeId, messageBody)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
       result => {
         this.errorMessage = " Message sent ";
         this.goBack();
        },
      (error:any) => {
        if (error instanceof HttpErrorResponse &&
           error.hasOwnProperty("error")&&
           error.error != null &&
           error.error.hasOwnProperty("ModelState") &&
           error.error.ModelState != null
          ) {
          this.errorMessage = "Invalid input; ";
          var allerrors = this.generateErrorMessagesArray(error.error.ModelState);
          for (let errorlist of allerrors) {
            for (let e of errorlist.value) {
              this.errorMessage += e + ";  ";
            }
          }
        }
        else {
          this.errorMessage = " Error occured while sending your Message ";
        }
      });
  }

  goBack(){
    this.location.back();
  }

  generateErrorMessagesArray(obj) {
    if(obj == null) return [];
    var errormessages = Array();
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Array) {
        errormessages.push({ name: key, value: obj[key] })
      }
    });
    return errormessages;
  }

}
