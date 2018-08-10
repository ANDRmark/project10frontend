import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThemesComponent} from './themes/themes.component';
import { ThemeDetailsComponent } from './theme-details/theme-details.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';





const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:"themes"},
  { path: 'themes', component: ThemesComponent },
  { path : 'theme/:id', component: ThemeDetailsComponent},
  { path : 'logout', component: LoginComponent, data:{logout:true}},
  { path : 'login', component: LoginComponent},
  { path : 'register', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
