import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let routerTestSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return a valid JWT on successful login and set user value as the decoded token', (done: DoneFn) => {
    const mockResponse = {
      token: 'valid.jwt.token'
    };
    const decodedToken = {
      id: '123',
      email: 'test@example.com'
    };

    const credentials = {
      email: 'test@example.com',
      password: 'password'
    };
    spyOn(service, 'decodeUserFromJwt').and.returnValue(decodedToken);

    service.login(credentials).subscribe(response => {
      expect(response.token).toEqual(mockResponse.token);
      expect(service.user()).toEqual(decodedToken);
      done();
    });
    httpTestingController.expectOne('login').flush(mockResponse);
  });

  it('should set user value to null if the login was unsuccessful', (done: DoneFn) => {
    const mockErrorResponse = {
      status: 401,
      message: 'Unauthorized'
    };

    const credentials = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };

    service.login(credentials).subscribe({
      next: () => {
        // This should not be called
        fail('expected an error, not a successful login');
      },
      error: (_) => {
        expect(service.user()).toBeNull();
        done();
      }
    });
    httpTestingController.expectOne('login').flush(mockErrorResponse);
  });

  it('should set user value to null on successful log out', (done: DoneFn) => {
    service.logout().subscribe({
      next: () => {
        expect(service.user()).toBeNull();
        done();
      },
      error: (_) => {
        fail('expected a successful logout');
      }
    });
    httpTestingController.expectOne('logout').flush({ message: "Logged out successfully!" });
    
  });
});
