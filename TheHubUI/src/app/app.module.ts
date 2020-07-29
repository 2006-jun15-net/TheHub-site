import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';

import { MediaListComponent } from './media-list/media-list.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegisterComponent } from './register/register.component';
import { PrintErrorComponent } from './print-error/print-error.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReviewListComponent } from './review-list/review-list.component';


const config =
{
  issuer: 'https://dev-257351.okta.com/oauth2/default',
  redirectUri: location.origin + '/implicit/callback',
  clientId: '0oanaqq0jvHgBRqGM4x6',
  pkce: true,
  scopes: ['openid', 'profile', 'email']

};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MediaListComponent,
    RegisterComponent,
    PrintErrorComponent,
    HomeComponent,
    SidebarComponent,
    ReviewListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    OktaAuthModule,
  ],
  providers: [{provide: OKTA_CONFIG, useValue: config}],
  bootstrap: [AppComponent]
})
export class AppModule { }
