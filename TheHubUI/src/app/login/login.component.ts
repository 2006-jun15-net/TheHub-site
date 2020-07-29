import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

import { UserService} from '../user-service.service';
import User from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  error: string = '';
  user: User | null = null;
  data: string ='';
  isAuthenticated: boolean = false;

  constructor(public oktaAuth: OktaAuthService, private userService: UserService) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  onSubmit()
  {
    this.userService.login(this.username, this.password)
    .then(user => {
      this.error = '';
      this.user = user;
      console.log('sucess');
      console.log(user);

    })
    .catch(error => this.error = error.toString());
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/home');
  }

}
