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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    AppMaterialModule,
  ]
})

export class AppComponent implements OnInit, AfterViewInit {
  titleService = inject(Title);
  todoService = inject(TodoService);
  dialog = inject(MatDialog);
  snack = inject(MatSnackBar);

  todos: WritableSignal<Todo[]> = signal([]);
  metaPagination: WritableSignal<MetaPagination> = signal({
    pageSize: 10
  });

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  
  ngOnInit(): void {
    this.titleService.setTitle('Todo App');
    this.getTodos();
    
  }

  ngAfterViewInit(): void {
    this.paginator?.page.subscribe(() => {
      window.scroll(0, 0);
      this.getTodos();
    });
  }

  getTodos() {
    this.todoService.getTodos({
      page: this.paginator ? this.paginator.pageIndex + 1 : 1,
      perPage: this.paginator ? this.paginator.pageSize : this.metaPagination().pageSize!
    }).subscribe({
      next: (data) => {
        this.todos.set(data.todos);
        this.metaPagination.set(data.meta);
        if(this.paginator) {
          this.paginator.length = data.meta.total;
        }
        
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  toggleTodo(todo: Todo) {
    // so as not to change the local data if the todo is not updated on the server
    const todoCopy = new Todo(todo);
    todoCopy.done = !todo.done;

    this.todoService.updateTodo(todoCopy).subscribe({
      next: (data) => {
        const currentTodos = this.todos();
        const todoToUpdateIndex = currentTodos.findIndex(todo => todo.id === data.todo.id);
        if(todoToUpdateIndex > -1) {
          currentTodos[todoToUpdateIndex] = data.todo;
          this.todos.set(currentTodos);
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  createTodo() {
    this.dialog.open(CreateUpdateTodoFormComponent, {
      width: '600px',
      height: '450px',
      autoFocus: true,
      disableClose: true
    }).afterClosed().subscribe((data) => {
      if(data) {
        this.snack.open(
          'Todo created!', 'Ok', {duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom'}
        );
        this.getTodos();
      }
    })
  }

  updateTodo(todo: Todo) {
    this.dialog.open(CreateUpdateTodoFormComponent, {
      width: '600px',
      height: '450px',
      autoFocus: true,
      disableClose: true,

      data: {
        todo
      }
    }).afterClosed().subscribe((data) => {
      if(data) {
        this.snack.open(
          'Todo updated!', 
          undefined, 
          {duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom'}
        );
        this.getTodos();
      }
    })
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe({
      next: (data) => {
        this.snack.open(
          'Todo deleted!', 
          undefined, 
          {duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom'}
        );
        this.getTodos();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
