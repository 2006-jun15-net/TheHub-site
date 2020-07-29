import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Review from './models/review';
import Comment from './models/comment';
import {environment} from '../environments/environment';
import {OktaAuthService} from '@okta/okta-angular';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl: string = "https://project2-thehub.azurewebsites.net";

  constructor(private httpClient: HttpClient, private oktaAuth: OktaAuthService) { }

  async getReviewByMediaId(id: number)
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.httpClient.get<Review[]>(`${this.baseUrl}/api/review/media/${id}`, httpOptions).toPromise(); 
  }
  async addReview(review: Review)
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.httpClient.post<Review>(`${this.baseUrl}/api/review/CreateReview`, review, httpOptions).toPromise();
  }
  async getComments(id: number)
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/api/review/${id}/comments`, httpOptions).toPromise(); 
  }
  async addReviewLike(reviewId: number, userId: number)
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.httpClient.post(`${this.baseUrl}/api/review/like/${reviewId}/${userId}`, null, httpOptions).toPromise();
  }
}
