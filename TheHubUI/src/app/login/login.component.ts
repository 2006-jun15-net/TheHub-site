import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: UserService) { }

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
  ngOnInit(): void {
  }

}
