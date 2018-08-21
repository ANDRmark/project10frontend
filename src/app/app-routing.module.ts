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
import { ActionsOnUserComponent } from './actions-on-user/actions-on-user.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { ActionsOnSectionComponent } from './actions-on-section/actions-on-section.component';
import { ActionsOnThemeComponent } from './actions-on-theme/actions-on-theme.component';
import { ActionsOnMessageComponent } from './actions-on-message/actions-on-message.component';





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
  { path : "admindashboard", component: AdmindashboardComponent},
  { path : "admindashboard/actionsonuser/:userId", component: ActionsOnUserComponent},
  { path : "moderatordashboard", component : ModeratorDashboardComponent},
  { path : "moderatordashboard/actionsonsection/:sectionId", component : ActionsOnSectionComponent},
  { path : "moderatordashboard/actionsontheme/:themeId", component : ActionsOnThemeComponent},
  { path : "moderatordashboard/actionsonmessage/:messageId", component : ActionsOnMessageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
