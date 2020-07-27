import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import user from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "https://project2-thehub.azurewebsites.net/swagger/index.html";
  
  constructor(private httpClient : HttpClient) { }

}
