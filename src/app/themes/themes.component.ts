import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { ThemeService } from '../theme.service';
import { Message, Theme } from '../models';
import { catchError, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<object> = new Subject();
  errorMessage: string = " ";
  themes: Theme[];

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.getThemes();
    console.log("getThemes");
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  getThemes() {
    this.themes = [];
    this.themeService.getThemes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("themes")) {
          this.errorMessage = " ";
          this.themes = new Array();
          for (let theme of data.themes) {
            this.themes.push({
              ThemeName: theme.Title,
              ThemeId: theme.Id,
              CreateDate: new Date(theme.CreateDate)
            });
          }
        }
      },
        (error: any) => {
          this.errorMessage = error;
        }
      );
  }

}

