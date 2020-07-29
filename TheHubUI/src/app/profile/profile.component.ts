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

  constructor(private userService: UserService, public oktaAuth: OktaAuthService) { }

  getUser(): void{

   this.userService.getUser(2).then(user => {
     this.user = user;
   })
  }

 
  async ngOnInit() {
    // returns an array of claims
    const userClaims = await this.oktaAuth.getUser();

    // user name is exposed directly as property
   
    this.getUser();

  }

}
