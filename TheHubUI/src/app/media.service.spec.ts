import { MediaService } from './media.service';

describe('MediaService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let oktaAuthSpy: { get: jasmine.Spy };
  let service: MediaService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    oktaAuthSpy = jasmine.createSpyObj('OktaAuthService', ['getAccessToken']);
    service = new MediaService(httpClientSpy as any, oktaAuthSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
