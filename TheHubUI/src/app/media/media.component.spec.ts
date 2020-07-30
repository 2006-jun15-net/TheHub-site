import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { MediaComponent } from './media.component';
import { MediaService } from '../media.service';


describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(async(() => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    const mediaService = jasmine.createSpyObj('MediaService', ['getMediaByMediaId']);
    const route = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    const router = jasmine.createSpyObj('Router', ['']);
    router.events = jasmine.createSpyObj('event', ['subscribe']);
    router.events.subscribe.and.returnValue(true);
    route.snapshot.paramMap = jasmine.createSpyObj('paramMap', ['get']);



    TestBed.configureTestingModule({
      declarations: [ MediaComponent ],
      providers: [
        {provide: HttpClient, useValue: httpClient },
        {provide: MediaService, useValue: mediaService},
        {provide: ActivatedRoute, useValue: route},
        {provide: Router, useValue: router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
