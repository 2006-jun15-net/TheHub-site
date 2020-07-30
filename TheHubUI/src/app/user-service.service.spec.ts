import { UserService } from './user-service.service';
import User from './models/user';
import { of } from 'rxjs';

describe('UserService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let oktaAuthSpy: { get: jasmine.Spy };
  let service: UserService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    oktaAuthSpy = jasmine.createSpyObj('OktaAuthService', ['getAccessToken']);
    service = new UserService(httpClientSpy as any, oktaAuthSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
