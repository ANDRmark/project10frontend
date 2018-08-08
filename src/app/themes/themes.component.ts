import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit, OnDestroy {

  getThemesSubscription:Subscription = null;
  errorMessage : string = " ";

  themes:Theme[];

  constructor(private themeService:ThemeService) { }

  ngOnInit() {
    this.getThemes();
  }
  ngOnDestroy(){
    this.unsubscribe();
  }

  unsubscribe(){
    if(this.getThemesSubscription != null){
      this.getThemesSubscription.unsubscribe()
    }
  }

  getThemes(){
    this.unsubscribe();
    this.themes = [];
    this.getThemesSubscription = this.themeService.getThemes().subscribe(data => {
      if(data == null || !data.hasOwnProperty("themes")){
        this.errorMessage = "An error occured, try again later";
      }
      else{
        this.errorMessage = " ";
        this.themes = new Array();
        for(let theme of data.themes){
          this.themes.push({
            ThemeName:theme.Title,
            ThemeId:theme.Id,
            CreateDate: new Date(theme.CreateDate)
          });
        }
      }
    });
  }

}

export class Theme{

  public ThemeName:string;
  public ThemeId:number;
  public CreateDate:Date;
}
