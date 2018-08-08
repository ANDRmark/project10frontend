import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThemesComponent} from './themes/themes.component';
import { ThemeDetailsComponent } from './theme-details/theme-details.component';





const routes: Routes = [
  { path: 'themes', component: ThemesComponent },
  { path : 'theme/:id', component: ThemeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
