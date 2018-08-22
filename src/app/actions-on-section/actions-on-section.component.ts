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
  selector: 'app-actions-on-section',
  templateUrl: './actions-on-section.component.html',
  styleUrls: ['./actions-on-section.component.css']
})
export class ActionsOnSectionComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private location: Location,
    private sectionService: SectionsService) { }
  @ViewChild('NewSectionNameInput') NewSectionNameInput: ElementRef;
  private ngUnsubscribe: Subject<object> = new Subject();
  sectionId: number;
  errorMessage: string = "";
  errorMessages = null;
  section = null;

  ngOnInit() {
    this.sectionId = +this.route.snapshot.paramMap.get('sectionId');
    this.getSectionById(this.sectionId);
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

  getSectionById(sectionid: number) {
    this.section = null;
    this.clearErrors();
    this.sectionService.getSection(sectionid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("section") && data.section != null) {
          this.section = data.section;
        } else {
          this.errorMessage = " Section not found  ";
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
                this.errorMessage = "Error occured while getting information about section.";
              }
            }
          }
        }
      );
  }


  updateSection(section) {
    section.Id = this.sectionId;
    this.clearErrors();
    this.sectionService.UpdateSection(section)
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
                this.errorMessage = "Error occured while updating information about section.";
              }
            }
          }
        }
      );
  }


  DatetoString(datestr: Date) {
    var date = new Date(datestr);
    return `${date.toISOString().split('T')[0]}   ${date.toLocaleTimeString().split(' ')[0]}`;
  }

  deleteSection() {
    this.clearErrors();
    this.sectionService.DeleteSection(this.sectionId)
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
                this.errorMessage = "Error occured while deleting section.";
              }
            }
          }
        }
      );
  }

  renameSectionClick() {
    var newName = this.NewSectionNameInput.nativeElement.value;
    if (this.section != null) {
      //update info via  copy, so if update fails then user can see original (previous) values
      var sectiontoUpdate = JSON.parse(JSON.stringify(this.section));
      var newName = this.NewSectionNameInput.nativeElement.value;
      sectiontoUpdate.Title = newName;
      this.updateSection(sectiontoUpdate);
    } else {
      this.errorMessage = " Section not found, cannt rename section.";
    }
  }


}
