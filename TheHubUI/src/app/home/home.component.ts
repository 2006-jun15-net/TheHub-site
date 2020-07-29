import { Component, OnInit } from '@angular/core';

import { Media } from '../models/media';
import { SearchService } from '../search.service';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchMedia: Media | null = null;

  mediaList: Media[] | null = null;

  getItem: number = 0;

  constructor( private mediaService: SearchService ) { }
  
  ngOnInit(): void {
  }

  getMedia(value: string){
    //id: number = parseInt(value, 10);
    this.mediaService.getMediaTitles(value)
      .then(medias => {
        this.searchMedia = medias;
        console.log(this.searchMedia);
      })
  }

  filter(type: number){
    if (type == 1) {
      this.getItem = 1;
    }
    else if (type == 2) {
      this.getItem = 2;
    }
    else if (type == 3) {
      this.getItem = 3;
    }
    else if (type == 4) {
      this.getItem = 4;
    }
  } 

  getByGenre(value: string){
    this.mediaService.getMediaByGenre(value)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      })
  }

  //get by rating
  getByRating(rating: number){
    this.mediaService.getMediaByRating(rating)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      })
  }

  // get by review 
  getByReview(reviewCount: number){
    this.mediaService.getMediaByReviewCount(reviewCount)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      })
  }

  //get by composer
  getByComposer(composer: string){
    this.mediaService.getMediaByComposer(composer)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      })
  }

}
