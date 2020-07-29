import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OktaAuthService } from '@okta/okta-angular';

import {environment} from '../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Media } from './models/media';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  
  constructor(private http: HttpClient, public oktaAuth: OktaAuthService) { }

  private baseUrl: string = "https://project2-thehub.azurewebsites.net";

  private mediaControllerUrl = "https://project2-thehub.azurewebsites.net/api/media";
  private testUrl = "https://localhost:44320/api/media";
  

  async getMediaById(id: number)
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<Media>(`${this.baseUrl}/api/media/${id}`, httpOptions).toPromise();
  }
  async getMediaByMediaType(id: number) {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<Media[]>(`${this.baseUrl}/api/media/mediaType/${id}`, httpOptions).toPromise();
  }

  async getMediaByMediaId(id: number) {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<Media>(`${this.testUrl}/${id}`, httpOptions).toPromise();
  }
  

  ngOnInit() {
    
  }
}
