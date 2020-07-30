import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListComponent } from './media-list.component';
import { MediaService } from '../media.service';
import { HttpClient } from '@angular/common/http';

describe('MediaListComponent', () => {
  let component: MediaListComponent;
  let fixture: ComponentFixture<MediaListComponent>;

  beforeEach(async(() => {
    const mediaService = jasmine.createSpyObj('MediaService', ['getMediasByMediaType']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    mediaService.getMediasByMediaType.and.returnValue(Promise.resolve([]));
    TestBed.configureTestingModule({
      declarations: [ MediaListComponent ],
      providers: [
        {provide: MediaService, useValue: mediaService},
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
