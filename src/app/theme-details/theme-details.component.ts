import { Component, OnInit, OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {MessagesService} from '../messages.service';
import {Message, Theme} from '../models';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css']
})
export class ThemeDetailsComponent implements OnInit {
  private ngUnsubscribe: Subject<object> = new Subject();
  themeID:number;
  errorMessage1:string = " ";
  theme:Theme=null;
  messgages:Message[]=null;


  constructor( 
    private route: ActivatedRoute,
    private themeService:ThemeService,
    private messageService:MessagesService,
    private location: Location) {
     }

  ngOnInit() {
    this.themeID = +this.route.snapshot.paramMap.get('id');
    this.getTheme();
    this.getMessages();
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTheme(){
    this.themeService.getTheme(this.themeID).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      if(data == null || !data.hasOwnProperty("theme")){
        this.errorMessage1 += "  Cannt Get information abouth theme. ";
      }
      else{
        this.theme = {
          ThemeName:data.theme.Title,
          ThemeId:data.theme.Id,
          CreateDate: new Date(data.theme.CreateDate)
        };
      }
    });
  }

  getMessages(){
    this.themeID = +this.route.snapshot.paramMap.get('id');
    this.messageService.getMessagesByThemeId(this.themeID)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      if(data == null || !data.hasOwnProperty("messages")){
        this.errorMessage1 += "  Cannt Get information abouth messages of that theme. ";
      }
      else{
        this.messgages = new Array();
        for(let message of data.messages){
          this.messgages.push({
            MessageBody:message.MessageBody,
            CreateDate:new Date(message.CreateDate),
            Author:message.UserId,
          });
        }
      }
    });
  }

}


