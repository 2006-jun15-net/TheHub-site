import { Component, OnInit } from '@angular/core';
import {Media} from '../models/media';
import Review from '../models/review';
import Comment from '../models/comment';

import {ReviewService} from '../review.service';
import { MediaService } from '../media.service';
import { FormBuilder, Validators } from '@angular/forms';
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

  reviewFormShow: boolean = false;
  reviewButton: string = "Add Review";
  error: string = '';
  currentRate: number = 0;

  reviewForm = this.fb.group({
    content:['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
  });
  constructor(private reviewService: ReviewService, 
    private mediaService: MediaService,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.getMedia(1)
    this.getReviews(1);
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
    this.newReview.Rating = this.currentRate;
  }
  getComments(id: number)
  {
    
  }
  getMedia(id: number)
  {
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
  getReviews(id: number)
  {
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
