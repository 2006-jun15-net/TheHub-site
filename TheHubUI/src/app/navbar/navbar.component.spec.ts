import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { OktaAuthService } from '@okta/okta-angular';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    const oktaAuth = jasmine.createSpyObj('OktaAuthService', ['getUser']);
    oktaAuth.$authenticationState = jasmine.createSpyObj('$authenticationState',['subscribe']);
    const searchService = jasmine.createSpyObj('SearchService', ['getMediaTitles']);
    const router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    oktaAuth.getUser.and.returnValue(Promise.resolve());
    oktaAuth.$authenticationState.subscribe.and.returnValue(true);
    searchService.getMediaTitles.and.returnValue(Promise.resolve());
    router.navigateByUrl.and.returnValue();
    
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        {provide: OktaAuthService, useValue: oktaAuth},
        {provide: SearchService, useValue: searchService},
        {provide: Router, useValue: router},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
