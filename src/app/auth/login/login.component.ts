import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({email, password}).subscribe({
        next: (_) => {
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          console.error('Login error', error);
          alert('Invalid credentials');
        }
      }
      );
    }
  }
}
