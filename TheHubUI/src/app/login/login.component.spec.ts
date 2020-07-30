import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { UserService } from '../user-service.service';
import { OktaAuthService } from '@okta/okta-angular';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const httpClient = jasmine.createSpyObj("HttpClient", ["get"]);
    const userService = jasmine.createSpyObj("UserService", ["login"]);
    const oktaAuth = jasmine.createSpyObj('OktaAuthService', ['login']);
    oktaAuth.$authenticationState = jasmine.createSpyObj('$authenticationState',['subscribe']);
    oktaAuth.$authenticationState.subscribe.and.returnValue(true);

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: HttpClient, useValue: httpClient },
        {provide: UserService, useValue: userService},
        {provide: OktaAuthService, useValue: oktaAuth}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
