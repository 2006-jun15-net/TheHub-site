import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OktaAuthService } from '@okta/okta-angular';

import {environment} from '../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Media } from './models/media';
import { Genre } from './models/genre';
@Injectable({
  providedIn: 'root'
})
export class MediaService {


  constructor(private http: HttpClient, public oktaAuth: OktaAuthService) { }

  private baseUrl = 'https://project2-thehub.azurewebsites.net';

  private mediaControllerUrl = 'https://project2-thehub.azurewebsites.net/api/media';
  private testUrl = 'https://localhost:44320/api/media';


  async getMediaById(id: number): Promise<Media>
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.http.get<Media>(`${this.baseUrl}/api/media/${id}`, httpOptions).toPromise();
  }
  async getMediaByMediaType(id: number): Promise<Media[]> {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.http.get<Media[]>(`${this.baseUrl}/api/media/mediaType/${id}`, httpOptions).toPromise();
  }

  async getMediaByMediaId(id: number): Promise<Media> {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };
    return this.http.get<Media>(`${this.baseUrl}/api/media/${id}`, httpOptions).toPromise();
  }

  async getMediaGenre(id: number | undefined): Promise<Genre> {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken })
    };

    return this.http.get<Genre>(`${this.baseUrl}/api/media/genreid/${id}`, httpOptions).toPromise();

  }


}
