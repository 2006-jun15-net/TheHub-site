import { Component, OnInit } from '@angular/core';

import { Media } from '../models/media';
import { SearchService } from '../search.service';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  constructor(public oktaAuth: OktaAuthService) { 
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }
  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

  }
  searchMedia: Media | null = null;


  getMedia(value: string){
    this.mediaService.getMediaTitles(value)
      .then(medias => {
        this.searchMedia = medias;
        console.log(this.searchMedia);
      })
  }
  
  logout() {
    this.oktaAuth.logout('/');
  }
}
