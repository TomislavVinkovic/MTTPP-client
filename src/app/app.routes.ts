import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppComponent } from './app.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'app', component: AppComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];