import { Component, OnInit } from '@angular/core';

import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService) { }
  ngOnInit(): void {
  }



  logout() {
    this.oktaAuth.logout('/');
  }
}
