import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of  } from 'rxjs';
import {MessagesService} from '../messages.service';
import {Message, Theme} from '../models';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.css']
})
export class AddNewMessageComponent implements OnInit, OnDestroy {

  constructor(private  messageService: MessagesService) { }

  private ngUnsubscribe: Subject<object> = new Subject();
  @Input() themeId:number;
  errorMessage:string = " ";

  ngOnInit() {
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  CreateNewMessage(messageBody:string){
    this.messageService.sendNewMessage(this.themeId, messageBody)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
       result => {this.errorMessage = " Message sent ";},
      (error:any) => {
        this.errorMessage = " Error occured while sending your message ";
      });
  }

}
