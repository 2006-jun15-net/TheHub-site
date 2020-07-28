import { Component, OnInit } from '@angular/core';
import { UserService} from '../user-service.service';
import User from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User | null = null;
  constructor(private userService: UserService) { }

  getUser(): void{

   this.userService.getUser(2).then(user => {
     this.user = user;
   })
  }

  ngOnInit(): void {
    this.getUser();
  }

}
