import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import User from './models/user';
import {environment} from '../environments/environment';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://project2-thehub.azurewebsites.net";
  private testUrl = 'https://localhost:5001';
  //private nonMacUrl = 'https://localhost:4200';


  constructor(private httpClient : HttpClient, public oktaAuth: OktaAuthService) { 
    
  }

  register(newUser: User):Promise<User>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.httpClient.post<User>(`${this.baseUrl}api/User/CreateUser`, newUser, httpOptions).toPromise();
  }
  login(username: string, password: string)
  {
    return this.httpClient.get<User>(`${this.baseUrl}/api/User/login`,{
      params: {
        username: username,
        password: password
      }
  }).toPromise();
  }
  
  async getUser(userEmail: string)
  {
    const accessToken = await this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + accessToken }),
                                params: new HttpParams().set('email', userEmail)
    };
    return this.httpClient.get<User>(`${this.baseUrl}/api/User`, httpOptions).toPromise();
  }
}
