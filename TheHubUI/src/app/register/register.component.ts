import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../user-service.service';
import UserViewModel from '../models/user-view-model';
import User from '../models/user';

import {ConfirmedValidator} from '../confirmed.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private newUser: User | null = null;
  private response: string | null = null;
  private userVM: UserViewModel | null = null;

  profileForm = this.fb.group({
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    userName:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
    confirmPass: ['', Validators.required]
  }, {validator: ConfirmedValidator('password', 'confirmPass')});
   
  constructor(private fb: FormBuilder, private userService: UserService) { }

  
  onSubmit()
  {
    this.userVM = <UserViewModel>this.profileForm.value;
  
    this.newUser = {
      firstName: this.userVM.firstName,
      lastName: this.userVM.lastName,
      userName: this.userVM.userName,
      email: this.userVM.email,
      password: this.userVM.password
    }
    console.log("submitted");
    this.userService.register(this.newUser)
    .then()
    .catch((error) => this.response = error.toString());
  }
  ngOnInit(): void {
  }


}
