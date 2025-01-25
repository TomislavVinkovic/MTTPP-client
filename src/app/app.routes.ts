import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/guards/auth/auth.guard';
import { TodoListComponent } from './todo-list/todo-list.component';
import { loginGuard } from './auth/guards/login/login.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/todos', pathMatch: 'full' },
    { path: 'todos', component: TodoListComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [loginGuard] },
];