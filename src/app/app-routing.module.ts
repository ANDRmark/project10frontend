import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThemesComponent} from './themes/themes.component';
import { ThemeDetailsComponent } from './theme-details/theme-details.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AddNewMessageComponent} from './add-new-message/add-new-message.component';
import { AddNewThemeComponent } from './add-new-theme/add-new-theme.component';





const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:"themes"},
  { path: 'themes', component: ThemesComponent },
  { path: 'themes/newTheme', component: AddNewThemeComponent },
  { path : 'theme/:themeId', component: ThemeDetailsComponent},
  { path : 'theme/:themeId/newMessage', component: AddNewMessageComponent},
  { path : 'logout', component: LoginComponent, data:{logout:true}},
  { path : 'login', component: LoginComponent},
  { path : 'register', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
