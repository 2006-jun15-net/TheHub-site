import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Media } from './models/media';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    private baseUrl = "https://project2-thehub.azurewebsites.net";
  // private baseUrl = 'https://localhost:5001';

  async getMediaTitles(title: string) {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<Media>(`${this.baseUrl}/api/Media/title/${title}`, httpOptions)
    .toPromise();
  }

  async getMediaByGenre(genre: string) {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<Media[]>(`${this.baseUrl}/api/Media/genre/${genre}`, httpOptions)
    .toPromise();
  }

  async getMediaByReviewCount(numReviews: number) {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<Media[]>(`${this.baseUrl}/api/Media/reviewcount/${numReviews}`, httpOptions)
    .toPromise();
  }

  async getMediaByRating(rating: number) {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<Media[]>(`${this.baseUrl}/api/Media/rating/${rating}`, httpOptions)
    .toPromise();
  }

  async getMediaByComposer(composer: string) {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<Media[]>(`${this.baseUrl}/api/Media/composer/${composer}`, httpOptions)
    .toPromise();
  }

  constructor(  private http: HttpClient, public oktaAuth: OktaAuthService ) { }
}
