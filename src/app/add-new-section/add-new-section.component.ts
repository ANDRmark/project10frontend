import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { MessagesService } from '../messages.service';
import { AuthenticationService } from '../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Message, Theme, Section } from '../models';
import { catchError, map, tap } from 'rxjs/operators';
import { SectionsService } from '../sections.service';

@Component({
  selector: 'app-add-new-section',
  templateUrl: './add-new-section.component.html',
  styleUrls: ['./add-new-section.component.css']
})
export class AddNewSectionComponent implements OnInit, OnDestroy{

  constructor(private sectionService:SectionsService,
    private location: Location,
    private router: Router,) { }

  errorMessage: string = " ";
  private ngUnsubscribe: Subject<object> = new Subject();

  ngOnInit() {
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  goBack() {
    this.router.navigate(['sections']);
  }

  CreateNewSection(sectionName: string) {
    this.errorMessage = "";
    this.sectionService.sendNewSection(sectionName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        result => {
          this.errorMessage = " new Section sent ";
          this.goBack();
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse &&
            error.hasOwnProperty("error")&&
            error.error != null &&
            error.error.hasOwnProperty("ModelState") &&
            error.error.ModelState != null) {
            this.errorMessage = "Invalid input; ";
            var allerrors = this.generateErrorMessagesArray(error.error.ModelState);
            for (let errorlist of allerrors) {
              for (let e of errorlist.value) {
                this.errorMessage += e + ";  ";
              }
            }
          }
          else {
            this.errorMessage = " Error occured while sending your section ";
          }
        });
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

}
