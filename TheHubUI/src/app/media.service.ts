import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Media } from './models/media';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://project2-thehub.azurewebsites.net";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMediaById(id: number)
  {
    return this.http.get<Media>(`${this.baseUrl}/api/media/${id}`).toPromise();
  }
  getMediaByMediaType(id: number) {
    return this.http.get<Media[]>(`${this.baseUrl}/api/media/mediaType/${id}`)
    .toPromise();
  }
  
}
