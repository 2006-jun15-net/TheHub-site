import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import User from './models/user';
import {environment} from '../environments/environment';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://project2-thehub.azurewebsites.net';


  constructor(private httpClient: HttpClient, public oktaAuth: OktaAuthService) { }

  async getUser(userEmail: string): Promise<User>
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }),
      params: new HttpParams().set('email', userEmail)
    };
    return this.httpClient.get<User>(`${this.baseUrl}/api/User`, httpOptions).toPromise();
  }

  async getFollowers(userId: number)
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken })
    };
    return this.http.get<User[]>(`${this.baseUrl}/api/User/followers/${userId}`, httpOptions).toPromise();
  }
}
