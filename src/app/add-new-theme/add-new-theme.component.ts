import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { MessagesService } from '../messages.service';
import { AuthenticationService } from '../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Message, Theme } from '../models';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-new-theme',
  templateUrl: './add-new-theme.component.html',
  styleUrls: ['./add-new-theme.component.css']
})
export class AddNewThemeComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
    public authenticationService: AuthenticationService,
    private location: Location,
    private router: Router,
  ) { }

  errorMessage: string = " ";
  private ngUnsubscribe: Subject<object> = new Subject();

  ngOnInit() {
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  CreateNewTheme(themeName: string) {
    this.errorMessage = "";
    this.themeService.sendNewTheme(themeName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        result => {
          this.errorMessage = " Theme sent ";
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
            this.errorMessage = " Error occured while sending your theme ";
          }
        });
  }

  goBack() {
    this.router.navigate(['themes']);
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
