import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import user from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "#";
  
  constructor(private httpClient : HttpClient) { }

}
