import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import { apiInterceptor } from './api.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


describe('apiInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => apiInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([apiInterceptor])
        ),
        provideHttpClientTesting(),
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should prepend a slash if it is not present in the endpoint', () => {
    const baseUrl = environment.BASE_URL;
    const endpoint = 'verify-token';
    const expectedUrl = `${baseUrl}/${endpoint}`;

    httpClient.get(`${endpoint}`).subscribe();

    const httpRequest = httpTestingController.expectOne(expectedUrl);

    expect(httpRequest.request.url).toBe(expectedUrl);
  });

  it('should remove an extra slash if it is not present in the endpoint', () => {
    const baseUrl = environment.BASE_URL;
    const endpoint = '/verify-token';
    const expectedUrl = `${baseUrl}${endpoint}`;

    httpClient.get(`${endpoint}`).subscribe();

    const httpRequest = httpTestingController.expectOne(expectedUrl);

    expect(httpRequest.request.url).toBe(expectedUrl);
  });

  it('should add Authorization header', () => {
    const baseUrl = environment.BASE_URL;
    const endpoint = 'validate-token';
    const expectedUrl = `${baseUrl}/${endpoint}`;


    const testToken = 'test-token';
    localStorage.setItem('token', 'test-token');

    httpClient.get(`validate-token`).subscribe();

    const httpRequest = httpTestingController.expectOne(expectedUrl);

    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
  });

  it('should not add Authorization header if token   is not present', () => {
    const baseUrl = environment.BASE_URL;
    const endpoint = 'validate-token';
    const expectedUrl = `${baseUrl}/${endpoint}`;

    localStorage.removeItem('token');
    httpClient.get(`validate-token`).subscribe();

    const httpRequest = httpTestingController.expectOne(expectedUrl);

    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });
});
