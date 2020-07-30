import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import {UserService} from '../user-service.service';

import { ProfileComponent } from './profile.component';
import { from } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    const userService = jasmine.createSpyObj('UserService', ['getUser']);
    const oktaAuth = jasmine.createSpyObj('OktaAuthService', ['getUser']);

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [
        {provide: HttpClient, useValue: httpClient},
        {provide: OktaAuthService, useValue: oktaAuth},
        {provide: UserService, useValue: userService},


      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
