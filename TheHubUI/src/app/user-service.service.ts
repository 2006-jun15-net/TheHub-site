import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import User from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private baseUrl = "https://project2-thehub.azurewebsites.net";
  private testUrl = 'https://localhost:44320';

  constructor(private httpClient : HttpClient) { }

  register(newUser: User):Promise<User>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.httpClient.post<User>(`${this.testUrl}api/User/CreateUser`, newUser, httpOptions).toPromise();
  }
  login(username: string, password: string)
  {
    return this.httpClient.get<User>(`${this.testUrl}/api/User/login`,{
      params: {
        username: username,
        password: password
      }
  }).toPromise();
  }
}
