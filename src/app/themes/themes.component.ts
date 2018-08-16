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
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<object> = new Subject();
  errorMessage: string = " ";
  themes: Theme[] = [];
  sectionId:number;
  section:Section=null;
  currentUrl:string = null;

  constructor(
    private sectionService:SectionsService,
    private themeService: ThemeService,
    public authenticationService: AuthenticationService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.sectionId = +this.route.snapshot.paramMap.get('sectionId')
    this.currentUrl=this.route.snapshot['_routerState'].url;
    this.getSection();
    this.getThemes();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  getThemes() {
    this.themes = [];
    this.themeService.GetThemesBySection(this.sectionId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("themes")) {
          this.themes = new Array();
          for (let theme of data.themes) {
            this.themes.push({
              ThemeName: theme.Title,
              ThemeId: theme.Id,
              CreateDate: new Date(theme.CreateDate),
              SectionId:theme.SectionId
            });
          }
        }
      },
        (error: any) => {
          this.errorMessage += " Error occured while getting information about themes. ";
        }
      );
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

}

