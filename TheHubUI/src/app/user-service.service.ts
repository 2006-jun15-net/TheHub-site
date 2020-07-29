import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import User from './models/user';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://project2-thehub.azurewebsites.net";
  private testUrl = 'https://localhost:5001';
  //private nonMacUrl = 'https://localhost:4200';


  constructor(private httpClient : HttpClient) { }

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
  
  getUser(userEmail: string)
  {
    return this.httpClient.get<User>(`${this.baseUrl}/api/User`, {
      params:{
        email: userEmail
      }
    }).toPromise();
  }
}
