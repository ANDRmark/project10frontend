import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThemesComponent} from './themes/themes.component';
import { ThemeDetailsComponent } from './theme-details/theme-details.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AddNewMessageComponent} from './add-new-message/add-new-message.component';
import { AddNewThemeComponent } from './add-new-theme/add-new-theme.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { SectionsComponent } from './sections/sections.component';
import { AddNewSectionComponent } from './add-new-section/add-new-section.component';





const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:"sections"},
  { path : "sections", component: SectionsComponent},
  { path : "sections/newSection", component: AddNewSectionComponent},
  { path : 'section/:sectionId', component: ThemesComponent },
  { path : 'section/:sectionId/newTheme', component: AddNewThemeComponent },
  { path : 'section/:sectionId/theme/:themeId', component: ThemeDetailsComponent},
  { path : 'section/:sectionId/theme/:themeId/newMessage', component: AddNewMessageComponent},
  { path : 'logout', component: LoginComponent, data:{logout:true}},
  { path : 'login', component: LoginComponent},
  { path : 'register', component: RegistrationComponent},
  { path : "admindashboard", component: AdmindashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
