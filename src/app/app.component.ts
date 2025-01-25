import { AfterViewInit, Component, Inject, OnInit, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TodoService } from './todo-service/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from './models/todo';
import { MetaPagination } from './types/apiTypes';
import { MatPaginator } from '@angular/material/paginator';
import { CreateUpdateTodoFormComponent } from './create-update-todo-form/create-update-todo-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material.module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
  ]
})

export class AppComponent {

  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout().subscribe({
      next: _ => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('An error occurred while logging out');
      }
    });
  }
}
