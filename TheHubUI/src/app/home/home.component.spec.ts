import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {SearchService} from '../search.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    const httpClient = jasmine.createSpyObj("HttpClient", ["get"]);
    const searchService = jasmine.createSpyObj("SearchService", ["getMediaTitles","getMediaByGenre", "getMediaByReviewCount", "getMediaByRating", "geMediaByCOmposer"]);
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: HttpClient, useValue: httpClient },
        {provide: SearchService, useValue: searchService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Get Item should only be 1-5`, async(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    expect(component.getItem).toBeGreaterThanOrEqual(0);
  }));
});
