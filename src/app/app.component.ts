import { Component, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import{AuthenticationService} from './authentication.service';
import { catchError, map, tap } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  /**
   *
   */
  constructor(public authenticationService:AuthenticationService, private cd:ChangeDetectorRef) {
    
  }
  title = 'app';
  private ngUnsubscribe: Subject<object> = new Subject();
  isAuthenticated:boolean=false;
  user:string = null;

  ngOnInit(){
    this.isAuthenticated = this.authenticationService.currentState.isAuthenticated;
    this.user = this.authenticationService.currentState.user;
    this.authenticationService.authentcationStateChange
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.cd.detectChanges();
    });
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

   isLoggedIn():boolean{
     return this.isAuthenticated;
   }
}
