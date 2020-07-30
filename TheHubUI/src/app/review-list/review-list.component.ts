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
  newComment: Comment | null = null;
  comments: Comment[] | null = null;

  UserEmail: string | undefined = '';
  UserId: number | undefined = undefined;
  reviewId = 0;
  reviewFormShow = false;
  commentFormShow = false;
  reviewButton = 'Add Review';
  error = '';
  currentRate = 0;

  isAuthenticated = false;

  reviewForm = new FormGroup({
    content: new FormControl('',
    [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
     rating: new FormControl(0)
  });
  commentForm = new FormGroup({
    content: new FormControl('',
    [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
  });


  constructor(private reviewService: ReviewService,
              private mediaService: MediaService,
              private userService: UserService,
              private oktaAuth: OktaAuthService,
              private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const userClaims = await this.oktaAuth.getUser();
    if (userClaims){
      this.UserEmail = userClaims.email;
      console.log(this.UserEmail);
    }

    this.getMedia();
    this.reloadReviews();
    this.getUser();
  }
  reviewToggle(button: HTMLElement): void
  {
    if (this.reviewFormShow)
    {
      this.reviewFormShow = false;
      button.innerHTML = '+';
    }
    else
    {
      this.reviewFormShow = true;
      button.innerHTML = '-';
    }
  }
  commentToggle(button: HTMLElement): void
  {
    if (this.commentFormShow)
    {
      this.commentFormShow = false;
      button.innerHTML = '+';
    }
    else
    {
      this.commentFormShow = true;
      button.innerHTML = '-';
    }
  }
  onSubmitComment(reviewId: number): void
  {
    this.newComment = (this.commentForm.value as Comment);
    if (this.UserId){
      this.newComment.reviewId = reviewId;
      this.newComment.userId = this.UserId;
      console.log(this.newComment);
      this.reviewService.addComment(this.newComment)
      .then(comment => {
        console.log('success');
        console.log(comment);
        this.getComments(reviewId);
      })
      .catch(error => {
        this.error = error.toString();
        console.log(error);
      });
      this.commentForm.reset();
    }

  }
  onSubmitReview(): void
  {
    this.newReview = (this.reviewForm.value as Review);
    if (this.selectedMedia && this.UserId){
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
        console.log(error);
      });
      this.reviewForm.reset();
    }

  }
  getComments(id: number): void
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
    });
  }
  getMedia(): void
  {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      const id = +idString;
      this.mediaService.getMediaById(id)
      .then(media => {
        this.selectedMedia = media;
        console.log(this.selectedMedia);
      })
      .catch(error => {
        this.error = error.toString();
        console.log(error);
      });
    }
  }
  reloadReviews(): void
  {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      const id = +idString;
      this.reviewService.getReviewByMediaId(id)
      .then(reviews => {
        this.reviews = reviews;
        console.log(reviews);
      })
      .catch(error => {
        this.error = error.toString();
        console.log(error);
      });
    }
  }

  getUser(): void
  {
    // get user from login credentials here
    if (this.UserEmail)
    {
      this.userService.getUser(this.UserEmail)
      .then(user => {
        this.UserId = user.userId;
      });
    }

  }


  Like(reviewId: number): void
  {
      if (this.UserId)
      {
        this.reviewService.addReviewLike(reviewId, this.UserId)
        .then(() => this.reloadReviews())
        .catch(error => {
          this.error = error.toString();
          console.log(error);
        });
      }
    }
  }

