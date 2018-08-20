import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { ThemeService } from '../theme.service';
import { Message, Theme, User, Role } from '../models';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SectionsService } from '../sections.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-moderator-dashboard',
  templateUrl: './moderator-dashboard.component.html',
  styleUrls: ['./moderator-dashboard.component.css']
})
export class ModeratorDashboardComponent implements OnInit, OnDestroy {

  constructor(
    private route:ActivatedRoute,
    private sectionsService:SectionsService,
    private themeService:ThemeService,
    private messageService:MessagesService
  ) { }
  @ViewChild('SectionIdInput') SectionIdInput: ElementRef; 
  @ViewChild('SectionNameInput') SectionNameInput: ElementRef;
  private ngUnsubscribe: Subject<object> = new Subject();
  sections:any[] = null;
  themes:any[] = null;
  messages:any[] = null;
  errorMessage = " ";
  errorMessages: any;
  currentUrl:string;

  ngOnInit() {
    this.currentUrl=this.route.snapshot['_routerState'].url;
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  clearErrors() {
    this.errorMessage = "";
    this.errorMessages = null;
  }
  DatetoString(datestr:Date){
    var date = new Date(datestr);
    return `${date.toISOString().split('T')[0]}   ${date.toLocaleTimeString().split(' ')[0]}`;
  }

  getAllSections(){
    this.sections = null;
    this.clearErrors();
    this.sectionsService.getAllSections()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("sections")) {
          this.sections = data.sections;
        }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessage = "Invalid request; ";
            this.errorMessages = this.generateErrorMessagesArray(e.error.ModelState)
          }
          else {
            if (e.error.hasOwnProperty("Message")) {
              this.errorMessage = e.error.Message;
            }
            else {
              this.errorMessage = "Error occured while getting information about sections.";
            }
          }
        }
      );
  }

  getSectionById(sectionId:number){
    this.sections = null;
    this.clearErrors();
    this.sectionsService.getSection(sectionId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("section")) {
          if(data.section == null){
            this.sections = [];
          } else{
            this.sections = [data.section];
          }
        }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessage = "Invalid argument for Id; ";
          }
          else {
            if (e.error.hasOwnProperty("Message")) {
              this.errorMessage = e.error.Message;
            }
            else {
              this.errorMessage = "Error occured while getting information about section.";
            }
          }
        }
      );
  }

  getSectionsByNamePart(sectionNamePart:string){
    this.sections = null;
    this.clearErrors();
    this.sectionsService.getSectionsByNamePart(sectionNamePart)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.hasOwnProperty("sections")) {
          this.sections = data.sections;
        }
      },
        (e: any) => {
          if (e.error.hasOwnProperty("ModelState")) {
            this.errorMessage = "Invalid request; ";
            this.errorMessages = e.error.ModelState;
          }
          else {
            if (e.error.hasOwnProperty("Message")) {
              this.errorMessage = e.error.Message;
            }
            else {
              this.errorMessage = "Error occured while getting information about section.";
            }
          }
        }
      );
  }

  GetAllSectionsClick(){
    this.getAllSections();
  }

  GetSectionByIdClick(){
    var sectionId = this.SectionIdInput.nativeElement.value;
    this.getSectionById(sectionId);
  }
  SearchSectionByNameClick(){
    var sectionNamePart = this.SectionNameInput.nativeElement.value;
    this.getSectionsByNamePart(sectionNamePart);
  }

}
