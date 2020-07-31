import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';


import { UserService} from '../user-service.service';
import User from '../models/user';


@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  user: User | null = null;
  UserEmail: string | undefined = '';
  followers: User[]| null = null;
  constructor(
    private userService: UserService,
    public oktaAuth: OktaAuthService
  ) { }

  async ngOnInit(): Promise<void> {
    const userClaims = await this.oktaAuth.getUser();
    if (userClaims){
      this.UserEmail = userClaims.email;
    }

    this.getUser();
    this.getFollowers();
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

  getFollowers(): void{
    // if(this.user){
    //   this.userService.getFollowers(this.user.userId)
    //   .then(followers =>{
    //     this.followers = followers; 
    //   });
    // }
  }

}
