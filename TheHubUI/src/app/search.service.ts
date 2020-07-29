import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Media } from './models/media';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    private baseUrl = "https://project2-thehub.azurewebsites.net";
  // private baseUrl = 'https://localhost:5001';

  getMediaTitles(title: string) {
    return this.http.get<Media>(`${this.baseUrl}/api/Media/title/${title}`)
    .toPromise();
  }

  getMediaByGenre(genre: string) {
    return this.http.get<Media[]>(`${this.baseUrl}/api/Media/genre/${genre}`)
    .toPromise();
  }

  getMediaByReviewCount(numReviews: number) {
    return this.http.get<Media[]>(`${this.baseUrl}/api/Media/reviewcount/${numReviews}`)
    .toPromise();
  }

  getMediaByRating(rating: number) {
    return this.http.get<Media[]>(`${this.baseUrl}/api/Media/rating/${rating}`)
    .toPromise();
  }

  getMediaByComposer(composer: string) {
    return this.http.get<Media[]>(`${this.baseUrl}/api/Media/composer/${composer}`)
    .toPromise();
  }

  constructor(  private http: HttpClient ) { }
}
