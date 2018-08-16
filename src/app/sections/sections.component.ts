import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { ThemeService } from '../theme.service';
import { Message, Theme, Section } from '../models';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import { SectionsService } from '../sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit, OnDestroy{

  constructor(
    public authenticationService: AuthenticationService,
    private route:ActivatedRoute,
    private sectionService:SectionsService) { }
  private ngUnsubscribe: Subject<object> = new Subject();
  sections:Section[] =[];
  currentUrl:string = null;
  errorMessage:string = " ";

  ngOnInit() {
    this.currentUrl=this.route.snapshot['_routerState'].url;
    this.getSections();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getSections() {
    this.sections = [];
    this.sectionService.getSections()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("sections")) {
          this.errorMessage = " ";
          this.sections = new Array();
          for (let theme of data.sections) {
            this.sections.push({
              SectionName: theme.Title,
              SectionId: theme.Id,
              CreateDate: new Date(theme.CreateDate)
            });
          }
        }
      },
        (error: any) => {
          this.errorMessage = "Error occured while getting information about sections.";
        }
      );
  }

}
