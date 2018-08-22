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
  selector: 'app-actions-on-theme',
  templateUrl: './actions-on-theme.component.html',
  styleUrls: ['./actions-on-theme.component.css']
})
export class ActionsOnThemeComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private location: Location,
  private themeService:ThemeService) { }

  @ViewChild('NewThemeNameInput') NewThemeNameInput: ElementRef;
  @ViewChild('NewSectionIdInput') NewSectionIdInput: ElementRef;
  private ngUnsubscribe: Subject<object> = new Subject();
  themeId: number;
  errorMessage: string = "";
  errorMessages = null;
  theme = null;

  ngOnInit() {
    this.themeId = +this.route.snapshot.paramMap.get('themeId');
    this.getThemeById(this.themeId);
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

  getThemeById(themeId:number){
    this.theme = null;
    this.clearErrors();
    this.themeService.getTheme(themeId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("theme") && data.theme != null) {
            this.theme = data.theme;
          } else{
            this.errorMessage = " Theme not found  ";
          }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessage = "Invalid request; ";
            this.errorMessages = e.error.ModelState;
          }
          else {
            if (e.hasOwnProperty("status") && e.status == 404) {
              this.errorMessage = "Invalid request, theme  id is not correct;";
            }
            else {
              if (e.error.hasOwnProperty("Message")) {
                this.errorMessage = e.error.Message;
              }
              else {
                this.errorMessage = "Error occured while getting information about tmeme.";
              }
            }
          }
        }
      );
  }

  updateTheme(theme){
    theme.Id = this.themeId;
    this.clearErrors();
    this.themeService.UpdateTheme(theme)
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
              this.errorMessage = "Error occured while updating information about theme.";
            }
          }
        }
      }
    );
  }

  deleteTheme(themeId:number){
    this.clearErrors();
    this.themeService.DeleteTheme(themeId)
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
              this.errorMessage = "Error occured while deleting theme.";
            }
          }
        }
      }
    );
  }

  renamethemeClick(){
    if(this.theme != null){
       //update info via theme copy, so if update fails then user can see original (previous) theme
      var themetoUpdate = JSON.parse(JSON.stringify(this.theme));
      var newName = this.NewThemeNameInput.nativeElement.value;
      themetoUpdate.Title = newName;
      this.updateTheme(themetoUpdate);
    } else{
      this.errorMessage = " Theme not found, cannt rename.";
    }
  }

  movethemeClick(){
    if(this.theme != null){
      //update info via theme copy, so if update fails then user can see original (previous) theme
     var themetoUpdate = JSON.parse(JSON.stringify(this.theme));
     var SectionId = this.NewSectionIdInput.nativeElement.value;
     themetoUpdate.SectionId = SectionId;
     this.updateTheme(themetoUpdate);
   } else{
     this.errorMessage = " Theme not found, cannt move to other section.";
   }
  }

  deleteThemeClick(){
    this.deleteTheme(this.themeId);
  }

}
