import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path:'welcome', component:WelcomeComponent, title:'welcome', children:[
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent, title:'login'},
    {path:'signup', component:SignupComponent, title:'signup'}
  ]},
  {path:'home', component:HomeComponent, title:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
