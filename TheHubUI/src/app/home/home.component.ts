import { Component, OnInit } from '@angular/core';

import { Media } from '../models/media';
import { SearchService } from '../search.service';
import {ReviewService} from '../review.service';
import Review from '../models/review';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchMedia: Media | null = null;

  mediaList: Media[] | null = null;

  getItem: number = 0;

  reviews: Review[] | null = null;
  UserEmail: string | undefined = "";
  error: string = '';
  UserId: number | undefined = undefined;



  constructor( private mediaService: SearchService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private oktaAuth: OktaAuthService,
    private userService: UserService
    ) { }
  
  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    if(userClaims){
      this.UserEmail = userClaims.email;
    }
    this.getUserId();
    this.feed();
  }

  getUserId(){
    if(this.UserEmail)
    {
      this.userService.getUser(this.UserEmail)
      .then(user => {
        this.UserId = user.userId;
      })
    }
  }

  // the feed
  feed(){
    if (this.UserId){
      this.reviewService.getFeed(this.UserId)
      .then(reviews => {
        this.reviews = reviews;
        console.log(reviews);
      })
      .catch(error => {
        this.error = error.toString();
        console.log(error);
      })
    }
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
