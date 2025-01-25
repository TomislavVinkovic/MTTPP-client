import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validators: this.confirmPasswordValidator });

  confirmPasswordValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.register({email, password}).subscribe({
        next: _ => {
          alert('Registration successful');
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Registration error', error);
          alert('There was an error during the processing of your registration');
        }
      }
      );
    }
  }
}
