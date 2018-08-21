import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './/app-routing.module';
import { ThemesComponent } from './themes/themes.component';
import { ThemeDetailsComponent } from './theme-details/theme-details.component';
import { AddNewMessageComponent } from './add-new-message/add-new-message.component';
import { AddNewThemeComponent } from './add-new-theme/add-new-theme.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { SectionsComponent } from './sections/sections.component';
import { AddNewSectionComponent } from './add-new-section/add-new-section.component';
import { ActionsOnUserComponent } from './actions-on-user/actions-on-user.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { ActionsOnSectionComponent } from './actions-on-section/actions-on-section.component';
import { ActionsOnThemeComponent } from './actions-on-theme/actions-on-theme.component';
import { ActionsOnMessageComponent } from './actions-on-message/actions-on-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ThemesComponent,
    ThemeDetailsComponent,
    AddNewMessageComponent,
    AddNewThemeComponent,
    AdmindashboardComponent,
    SectionsComponent,
    AddNewSectionComponent,
    ActionsOnUserComponent,
    ModeratorDashboardComponent,
    ActionsOnSectionComponent,
    ActionsOnThemeComponent,
    ActionsOnMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
