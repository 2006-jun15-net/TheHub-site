import { Component, OnInit } from '@angular/core';

import { Media } from '../models/media';
import { SearchService } from '../search.service';

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
        console.log(this.searchMedia);
      })
      
  }

  constructor( private mediaService: SearchService ) { }
  ngOnInit(): void {
  }

}
