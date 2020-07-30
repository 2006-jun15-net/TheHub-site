import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';


import { UserService} from '../user-service.service';
import User from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User | null = null;
  UserEmail: string | undefined = '';

  constructor(
    private userService: UserService,
    public oktaAuth: OktaAuthService
    ) {

     }

     async ngOnInit(): Promise<void> {
      const userClaims = await this.oktaAuth.getUser();
      if (userClaims){
        this.UserEmail = userClaims.email;
      }

      this.getUser();
    }

  getUser(): void{
    if (this.UserEmail)
    {
      this.userService.getUser(this.UserEmail)
      .then(user => {
        this.user = user;
      });
    }
  }




}
