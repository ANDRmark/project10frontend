import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { MessagesService } from '../messages.service';
import { Message, Theme, Section } from '../models';
import { catchError, map, tap } from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import { SectionsService } from '../sections.service';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css']
})
export class ThemeDetailsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<object> = new Subject();
  themeID: number;
  sectionId: number;
  errorMessage: string = " ";
  theme: Theme = null;
  section:Section = null;
  messgages: Message[] = null;
  currentUrl:string="";


  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private messageService: MessagesService,
    private sectionService:SectionsService,
    public authenticationService:AuthenticationService,
    private location: Location) {
  }

  ngOnInit() {
    this.themeID = +this.route.snapshot.paramMap.get('themeId');
    this.sectionId = +this.route.snapshot.paramMap.get('sectionId');
    this.currentUrl=this.route.snapshot['_routerState'].url;
    this.getSection();
    this.getTheme();
    this.getMessages();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTheme() {
    this.themeService.getTheme(this.themeID).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("theme")) {
          this.theme = {
            ThemeName: data.theme.Title,
            ThemeId: data.theme.Id,
            CreateDate: new Date(data.theme.CreateDate),
            SectionId:data.theme.SectionId
          };
        }
      },
        (error: any) => {
          this.errorMessage += "  Error occured while getting information abouth theme. ";
        });
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

  getMessages() {
    this.messageService.getMessagesByThemeId(this.themeID)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("messages")) {
          this.messgages = new Array();
          for (let message of data.messages) {
            this.messgages.push({
              MessageBody: message.MessageBody,
              CreateDate: new Date(message.CreateDate),
              Author: message.UserName,
            });
          }
        }
      },
        (error: any) => {
          this.errorMessage += " Error occured while getting information abouth messages of that theme. ";
        });
  }

}


