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
    AddNewSectionComponent
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
