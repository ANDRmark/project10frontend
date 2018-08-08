import { Component, OnInit, OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css']
})
export class ThemeDetailsComponent implements OnInit {

  themeID:number;
  errorMessage:string = " ";

  getThemeSubscription:Subscription;
  getMessagesSubscription:Subscription;

  constructor( 
    private route: ActivatedRoute,
    private themeService:ThemeService,
    private location: Location) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.unsubscribe();
  }

  unsubscribe(){
    if(this.getThemeSubscription != null){
      this.getThemeSubscription.unsubscribe()
    }
    if(this.getMessagesSubscription != null){
      this.getMessagesSubscription.unsubscribe()
    }
  }
  getTheme(){
    this.themeID = +this.route.snapshot.paramMap.get('id');
     this.themeService.getTheme(this.themeID);
  }

  getMessages(){

  }

}


export class Message{
  messageBody:string;
  createDate:Date;
  author:string;
}
