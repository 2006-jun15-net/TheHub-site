import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "login"},
  {path: "login", component: LoginComponent },
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
