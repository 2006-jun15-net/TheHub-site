import { Component, OnInit } from '@angular/core';

import { Media } from '../models/media';
import { SearchService } from '../search.service';
import {OktaAuthService} from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  constructor(public oktaAuth: OktaAuthService, private mediaService: SearchService, public router:Router) { 
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
        this.router.navigateByUrl(`/media/${this.searchMedia.mediaId}`);
      })
  }
  
  logout() {
    this.oktaAuth.logout('/');
  }
}
