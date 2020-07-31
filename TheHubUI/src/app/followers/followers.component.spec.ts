import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersComponent } from './followers.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user-service.service';
import { OktaAuthService } from '@okta/okta-angular';

describe('FollowersComponent', () => {
  let component: FollowersComponent;
  let fixture: ComponentFixture<FollowersComponent>;

  beforeEach(async(() => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    const userService = jasmine.createSpyObj('UserService', ['getUser', 'getFollowers']);
    const oktaAuth = jasmine.createSpyObj('OktaAuthService', ['getUser']);
    TestBed.configureTestingModule({
      declarations: [ FollowersComponent ],
      providers: [
        {provide: HttpClient, useValue: httpClient},
        {provide: UserService, useValue: userService},
        {provide: OktaAuthService, useValue: oktaAuth}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
