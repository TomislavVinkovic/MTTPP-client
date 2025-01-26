import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth-service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideRouter(routes),
        provideAnimationsAsync(),
      ]
    })
    .compileComponents();

    authService = jasmine.createSpyObj('AuthService', ['login']);
    TestBed.overrideProvider(AuthService, { useValue: authService });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a correct error message if the email is not valid', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();
    emailControl.updateValueAndValidity();
    fixture.detectChanges();

    const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
    emailInput.focus();
    emailInput.blur();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('#email-invalid-error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Please enter a valid email address');
  });

  it('should display a correct error message if the email is required', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('');
    emailControl.markAsTouched();
    emailControl.updateValueAndValidity();
    fixture.detectChanges();

    const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
    emailInput.focus();
    emailInput.blur();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('#email-required-error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Email is required');
  });

  it('should display a correct error message if the password is required', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('');
    passwordControl.markAsTouched();
    passwordControl.updateValueAndValidity();
    fixture.detectChanges();

    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    passwordInput.focus();
    passwordInput.blur();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('#password-required-error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Password is required');
  });

  it('should enable the submit button when the form is valid', () => {
    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    emailControl.setValue('test@example.com');
    passwordControl.setValue('validPassword123');
    emailControl.markAsTouched();
    passwordControl.markAsTouched();
    emailControl.updateValueAndValidity();
    passwordControl.updateValueAndValidity();
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(component.loginForm.valid).toBeTrue();
    expect(submitButton.disabled).toBeFalse();
  });

  it('should disable the submit button when the form is invalid', () => {
    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    emailControl.setValue('');
    passwordControl.setValue('');
    emailControl.markAsTouched();
    passwordControl.markAsTouched();
    emailControl.updateValueAndValidity();
    passwordControl.updateValueAndValidity();
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(component.loginForm.invalid).toBeTrue();
    expect(submitButton.disabled).toBeTrue();
  });

  it('should reroute to /todo-list on successful login', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    emailControl.setValue('test@example.com');
    passwordControl.setValue('validPassword123');
    emailControl.markAsTouched();
    passwordControl.markAsTouched();
    emailControl.updateValueAndValidity();
    passwordControl.updateValueAndValidity();
    fixture.detectChanges();

    authService.login.and.returnValue(of({token: 'jwt'})); // Mock successful login

    component.onSubmit();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/todos']);
  });

  it('should display an alert with "Invalid credentials" on unsuccessful login', () => {
    spyOn(window, 'alert');

    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    emailControl.setValue('test@example.com');
    passwordControl.setValue('invalidPassword');
    emailControl.markAsTouched();
    passwordControl.markAsTouched();
    emailControl.updateValueAndValidity();
    passwordControl.updateValueAndValidity();
    fixture.detectChanges();

    authService.login.and.returnValue(throwError(() => new Error('Invalid credentials'))); // Mock unsuccessful login

    component.onSubmit();
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });
});
