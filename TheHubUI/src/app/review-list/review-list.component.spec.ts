import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListComponent } from './review-list.component';
import { ReviewService } from '../review.service';
import { MediaService } from '../media.service';
import { UserService } from '../user-service.service';
import { OktaAuthService } from '@okta/okta-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;

  beforeEach(async(() => {
    const reviewService = jasmine.createSpyObj('ReviewService',
      ['getReviewByMediaId', 'getComments', 'addComment', 'addReview', 'addReviewLike']);
    const mediaService = jasmine.createSpyObj('MediaService', ['getMediaById']);
    const userService = jasmine.createSpyObj('UserService', ['getUser']);
    const oktaAuthService = jasmine.createSpyObj('OktaAuthService', ['getUser']);
    const route = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    const router = jasmine.createSpyObj('Router', ['']);
    const httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    reviewService.getReviewByMediaId.and.returnValue(Promise.resolve([]));
    reviewService.getComments.and.returnValue(Promise.resolve([]));
    reviewService.addComment.and.returnValue(Promise.resolve());
    reviewService.addReview.and.returnValue(Promise.resolve());
    reviewService.addReviewLike.and.returnValue(Promise.resolve());
    mediaService.getMediaById.and.returnValue(Promise.resolve([]));
    userService.getUser.and.returnValue(Promise.resolve());
    oktaAuthService.getUser.and.returnValue(Promise.resolve());
    router.events = jasmine.createSpyObj('event', ['subscribe']);
    router.events.subscribe.and.returnValue(true);
    route.snapshot.and.returnValue();

    TestBed.configureTestingModule({
      declarations: [ ReviewListComponent ],
      providers: [
        {provide: ReviewService, useValue: reviewService},
        {provide: MediaService, useValue: mediaService},
        {provide: UserService, userValue: userService},
        {provide: OktaAuthService, useValue: oktaAuthService},
        {provide: ActivatedRoute, useValue: route},
        {provide: Router, useValue: router},
        {provide: HttpClient, useValue: httpClient}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
