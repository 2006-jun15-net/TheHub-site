import { SearchService } from './search.service';

describe('SearchService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let oktaAuthSpy: { get: jasmine.Spy };
  let service: SearchService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    oktaAuthSpy = jasmine.createSpyObj('OktaAuthService', ['getUser']);
    service = new SearchService(httpClientSpy as any, oktaAuthSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
