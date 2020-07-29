import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Media } from './models/media';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  private mediaControllerUrl = "https://project2-thehub.azurewebsites.net/api/media";
  private testUrl = "https://localhost:44320/api/media";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getMediaByMediaType(id: number) {
    return this.http.get<Media[]>(`${this.testUrl}/mediaType/${id}`)
    .toPromise();
  }

  getMediaByMediaId(id: number) {
    return this.http.get<Media>(`${this.testUrl}/${id}`).toPromise();
  }
  
}
