import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MediaListComponent } from './media-list/media-list.component';
import { RegisterComponent } from './register/register.component';
import { MediaComponent } from './media/media.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ProfileComponent } from './profile/profile.component';
import { OktaCallbackComponent } from '@okta/okta-angular';

const CALLBACK_PATH = 'implicit/callback';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "login"},
  {path: "login", component: LoginComponent },
  { path: "media", component: MediaListComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent },
  {path: "profile", component: ProfileComponent},
  { path: 'media/:id', component: MediaComponent},
  {path: "media/reviews", component: ReviewListComponent},
  {path: "profile", component: ProfileComponent},
  {path: CALLBACK_PATH, component: OktaCallbackComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
