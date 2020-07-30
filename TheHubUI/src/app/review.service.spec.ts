import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let oktaAuthSpy: { get: jasmine.Spy };
  let service: ReviewService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    oktaAuthSpy = jasmine.createSpyObj('OktaAuthService', ['getAccessToken']);
    service = new ReviewService(httpClientSpy as any, oktaAuthSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
