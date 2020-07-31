import { Component, OnInit } from '@angular/core';

import { Media } from '../models/media';
import { SearchService } from '../search.service';
import Comment from '../models/comment';
import {ReviewService} from '../review.service';
import Review from '../models/review';
import { OktaAuthService } from '@okta/okta-angular';
import { UserService } from '../user-service.service';
import { MediaService } from '../media.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchMedia: Media | null = null;

  mediaList: Media[] | null = null;

  getItem = 0;
  reviews: Review[] | null = null;
  UserEmail: string | undefined = '';
  error = '';
  UserId: number | undefined = 0;
  media: Media | null = null;
  reviewId = 0;
  mediaId = 0;
  comments: Comment[] | null = null;

  constructor( private searchService: SearchService,
               private reviewService: ReviewService,
               private oktaAuth: OktaAuthService,
               private userService: UserService,
               private mediaService: MediaService
    ) { }

    async ngOnInit(): Promise<void> {
      const userClaims = await this.oktaAuth.getUser();
      if (userClaims){
        this.UserEmail = userClaims.email;
      }
      this.getUserId();
    }

    getUserId(): void {
      if (this.UserEmail)
      {
        this.userService.getUser(this.UserEmail)
        .then(user => {
          this.UserId = user.userId;
          this.feed();
          
        });
      }
    }

getMediaByMediaId(value: number): void{
      this.mediaId = value;
      this.mediaService.getMediaByMediaId(value)
       .then(medias => {
        this.media = medias;
        console.log(medias);
      })
      .catch(error => {
        this.error = error.toString();
        console.log(error);
      });
    }

    // the feed
    feed(): void{
      if (this.UserId){
        this.reviewService.getFeed(this.UserId)
        .then(reviews => {
          debugger;
          this.reviews = reviews;
          console.log(reviews);
        })
        .catch(error => {
          this.error = error.toString();
          console.log(error);
        });
      }
    }

    getComments(value: number): void{
      this.reviewId = value;
      this.reviewService.getComments(value)
      .then(comments => {
        this.comments = comments;
        console.log(comments);
      })
      .catch(error => {
        this.error = error.toString();
        console.log(error);
      });
    }

    Like(reviewId: number): void
    {
      if (this.UserId)
      {
        this.reviewService.addReviewLike(reviewId, this.UserId)
        .then(() => this.feed())
        .catch(error => {
          this.error = error.toString();
          console.log(error);
        });
      }
    }



  getMedia(value: string): void{
    this.searchService.getMediaTitles(value)
      .then(medias => {
        this.searchMedia = medias;
        console.log(this.searchMedia);
      });
  }

  filter(type: number): void{
    if (type === 1) {
      this.getItem = 1;
    }
    else if (type === 2) {
      this.getItem = 2;
    }
    else if (type === 3) {
      this.getItem = 3;
    }
    else if (type === 4) {
      this.getItem = 4;
    }
  }

  getByGenre(value: string): void{
    this.searchService.getMediaByGenre(value)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      });
  }

  // get by rating
  getByRating(rating: number): void{
    this.searchService.getMediaByRating(rating)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      });
  }

  // get by review
  getByReview(reviewCount: number): void{
    this.searchService.getMediaByReviewCount(reviewCount)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      });
  }

  // get by composer
  getByComposer(composer: string): void{
    this.searchService.getMediaByComposer(composer)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      });
  }

}
