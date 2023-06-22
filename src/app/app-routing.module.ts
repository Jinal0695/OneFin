import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {path:'', component:LoginPageComponent, pathMatch:'full'},

  {path:'moviesPage', component:MoviesPageComponent},

  {path:'login' , component:LoginPageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 
}
