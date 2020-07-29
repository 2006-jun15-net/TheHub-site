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

  private accessToken: String | undefined = undefined;
  constructor(private http: HttpClient, public oktaAuth: OktaAuthService) { }

  private baseUrl: string = "https://project2-thehub.azurewebsites.net";

  private mediaControllerUrl = "https://project2-thehub.azurewebsites.net/api/media";
  private testUrl = "https://localhost:44320/api/media";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.accessToken })
  };

  getMediaById(id: number)
  {
    return this.http.get<Media>(`${this.baseUrl}/api/media/${id}`).toPromise();
  }
  getMediaByMediaType(id: number) {
    return this.http.get<Media[]>(`${this.baseUrl}/api/media/mediaType/${id}`)
    .toPromise();
  }

  getMediaByMediaId(id: number) {
    return this.http.get<Media>(`${this.testUrl}/${id}`).toPromise();
  }
  

  async ngOnInit() {
    this.accessToken = await this.oktaAuth.getAccessToken();
  }
}
