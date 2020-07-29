import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MediaListComponent } from './media-list/media-list.component';
import { RegisterComponent } from './register/register.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "login"},
  {path: "login", component: LoginComponent },
  { path: "media", component: MediaListComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent },
  {path: "media/reviews", component: ReviewListComponent},
  {path: "profile", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
