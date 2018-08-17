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
  selector: 'app-add-new-theme',
  templateUrl: './add-new-theme.component.html',
  styleUrls: ['./add-new-theme.component.css']
})
export class AddNewThemeComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
    public authenticationService: AuthenticationService,
    private sectionService:SectionsService,
    private location: Location,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  errorMessage: string = " ";
  private ngUnsubscribe: Subject<object> = new Subject();
  sectionId:number;
  section:Section=null;

  ngOnInit() {
    this.sectionId = +this.route.snapshot.paramMap.get('sectionId');
    this.getSection();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  getSection() {
    this.sectionService.getSection(this.sectionId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("section")) {
          this.section = {
            SectionName: data.section.Title,
            SectionId: data.section.Id,
            CreateDate: new Date(data.section.CreateDate)
          };
        }
      },
        (error: any) => {
          this.errorMessage += " Error occured while getting information abouth section. ";
        });
  }

  CreateNewTheme(themeName: string) {
    this.errorMessage = "";
    this.themeService.sendNewTheme(this.sectionId,themeName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        result => {
          this.errorMessage = " new Theme sent ";
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
            if (error.error.hasOwnProperty("Message")) {
              this.errorMessage = error.error.Message;
            }
            else {
              this.errorMessage = "Error occured while sending new theme";
            }
          }
        });
  }

  goBack() {
    this.router.navigate(['section/'+this.sectionId]);
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
