import { Component, OnInit } from '@angular/core';

import { Media } from '../models/media';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchMedia: Media | null = null;

  constructor( private mediaService: SearchService ) { }
  
  ngOnInit(): void {
  }

  getMedia(value: string){
    //id: number = parseInt(value, 10);
    this.mediaService.getMediaTitles(parseInt(value, 10))
      .then(medias => {
        this.searchMedia = medias;
        console.log(this.searchMedia);
      })
  }
}
