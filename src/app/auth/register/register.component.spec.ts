import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../auth-service/auth.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
      ]
    })
    .compileComponents();
    
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a correct error message if the email is not valid', () => {
    const emailControl = component.registerForm.controls['email'];
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
    const emailControl = component.registerForm.controls['email'];
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
    const passwordControl = component.registerForm.controls['password'];
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

  it('should display a correct error message if the confirm password is required', () => {
    const passwordControl = component.registerForm.controls['confirmPassword'];
    passwordControl.setValue('');
    passwordControl.markAsTouched();
    passwordControl.updateValueAndValidity();
    fixture.detectChanges();

    const passwordInput = fixture.nativeElement.querySelector('input[name="confirm-password"]');
    passwordInput.focus();
    passwordInput.blur();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('#confirm-password-required-error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Password confirmation is required');
  });
});
