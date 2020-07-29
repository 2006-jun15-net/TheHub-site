import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Review from './models/review';
import Comment from './models/comment';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl: string = "https://project2-thehub.azurewebsites.net";

  constructor(private httpClient: HttpClient) { }

  getReviewByMediaId(id: number)
  {
    return this.httpClient.get<Review[]>(`${this.baseUrl}/api/review/media/${id}`).toPromise(); 
  }
  addReview(review: Review)
  {
    return this.httpClient.post<Review>(`${this.baseUrl}/api/review/CreateReview`, review).toPromise();
  }
  getComments(id: number)
  {
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/api/review/${id}/comments`).toPromise(); 
  }
  addReviewLike(reviewId: number, userId: number)
  {
    return this.httpClient.post(`${this.baseUrl}/api/review/like/${reviewId}/${userId}`, null).toPromise();
  }
}
