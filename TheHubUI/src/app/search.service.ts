import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Media } from './models/media';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private testUrl = 'https://localhost:5001/api/Media';

  getMediaTitles(id: number) {
    return this.http.get<Media>(`${this.testUrl}/${id}`)
    .toPromise();
  }

  constructor(  private http: HttpClient ) { }
}
