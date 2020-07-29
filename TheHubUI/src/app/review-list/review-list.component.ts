import { Component, OnInit } from '@angular/core';

import {Media} from '../models/media';
import Review from '../models/review';
import Comment from '../models/comment';

import {ReviewService} from '../review.service';
import { MediaService } from '../media.service';
import { UserService } from '../user-service.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  selectedMedia: Media | null = null;
  newReview: Review | null = null;
  reviews: Review[] | null = null;
  comments: Comment[] | null = null;

  UserEmail: string | undefined = "";
  UserId: number | undefined = undefined;
  reviewId: number = 0;
  reviewFormShow: boolean = false;
  reviewButton: string = "Add Review";
  error: string = '';
  currentRate: number = 0;

  isAuthenticated: boolean = false;

  reviewForm = new FormGroup({
    content: new FormControl('', 
    [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
     rating: new FormControl(0)
  });
  
  constructor(private reviewService: ReviewService, 
    private mediaService: MediaService,
    private userService: UserService,
    private oktaAuth: OktaAuthService,
    private route: ActivatedRoute) { 
      this.oktaAuth.$authenticationState.subscribe(
        (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
      );
    }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    if(userClaims){
      this.UserEmail = userClaims.email;
    }
    
    this.getMedia()
    this.reloadReviews();
    this.getUser();
  }
  reviewToggle(button: HTMLElement)
  {
    if(this.reviewFormShow)
    {
      this.reviewFormShow = false;
      button.innerHTML = "+";
    }
    else
    {
      this.reviewFormShow = true;
      button.innerHTML = "-";
    }
  }
  onSubmit(){
    this.newReview = <Review>this.reviewForm.value;
    if(this.selectedMedia && this.UserId){
      this.newReview.mediaId = this.selectedMedia.mediaId;
      this.newReview.userId = this.UserId;
      this.reviewService.addReview(this.newReview)
      .then(review => {
        console.log('success');
        console.log(review);
        this.reloadReviews();
      })
      .catch(error => {
        this.error = error.toString();
        console.log(error)
      });
      this.reviewForm.reset();
    }
    
  }
  getComments(id: number)
  {
    this.reviewId = id;
    this.reviewService.getComments(id)
    .then(comments => {
      this.comments = comments;
      console.log(comments);
    })
    .catch(error => {
      this.error = error.toString();
      console.log(error);
    })
  }
  getMedia()
  {
    let idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      let id = +idString;
      this.mediaService.getMediaById(id)
      .then(media => {
        this.selectedMedia = media;
        console.log(this.selectedMedia);
      })
      .catch(error => {
        this.error = error.toString();
        console.log(error);
      })
    }
  }
  reloadReviews()
  {
    let idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      let id = +idString;
      this.reviewService.getReviewByMediaId(id)
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



  getUser()
  {
    //get user from login credentials here
    if(this.UserEmail)
    {
      this.userService.getUser(this.UserEmail)
      .then(user => {
        this.UserId = user.userId;
      })
    }
    
  }

  
  Like(reviewId: number)
  {
      if(this.UserId)
      {
        this.reviewService.addReviewLike(reviewId,this.UserId)
        .then(() => this.reloadReviews())
        .catch(error =>{
          this.error = error.toString();
          console.log(error);
        })
      }
    }
  }

