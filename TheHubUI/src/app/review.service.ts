import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Review from './models/review';
import Comment from './models/comment';
import {OktaAuthService} from '@okta/okta-angular';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'https://project2-thehub.azurewebsites.net';
    // private baseUrl = 'https://localhost:5001';


  constructor(private httpClient: HttpClient, private oktaAuth: OktaAuthService) { }

  async getReviewByMediaId(id: number): Promise<Review[]>
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.httpClient.get<Review[]>(`${this.baseUrl}/api/review/media/${id}`, httpOptions).toPromise();
  }
  async addReview(review: Review): Promise<Review>
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.httpClient.post<Review>(`${this.baseUrl}/api/review/CreateReview`, review, httpOptions).toPromise();
  }
  async addComment(comment: Comment): Promise<Comment>
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.httpClient.post<Comment>(`${this.baseUrl}/api/review/AddComment`, comment, httpOptions).toPromise();
  }
  async getComments(id: number): Promise<Comment[]>
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/api/review/${id}/comments`, httpOptions).toPromise();
  }
  async addReviewLike(reviewId: number, userId: number): Promise<any>
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.httpClient.post(`${this.baseUrl}/api/review/like/${reviewId}/${userId}`, null, httpOptions).toPromise();
  }

  async getFeed(id: number): Promise<Review[]>
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.httpClient.get<Review[]>(`${this.baseUrl}/api/review/${id}/getfeed`, httpOptions).toPromise();
  }
}
