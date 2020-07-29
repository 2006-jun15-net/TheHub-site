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

  searchMedia: Media | null = null;


  getMedia(value: string){
    this.mediaService.getMediaTitles(value)
      .then(medias => {
        this.searchMedia = medias;
        this.router.navigateByUrl(`/media/${this.searchMedia.mediaId}`);
      })
  }

  constructor( private mediaService: SearchService , public oktaAuth: OktaAuthService, public router:Router) { }

  ngOnInit(): void {
  }
  
  logout() {
    this.oktaAuth.logout('/');
  }
}
