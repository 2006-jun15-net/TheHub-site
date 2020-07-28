import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Review from './models/review';
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
  
}
