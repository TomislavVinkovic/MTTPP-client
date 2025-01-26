import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../auth/auth-service/auth.service';
import { TodoService } from '../todo-service/todo.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Todo } from '../models/todo';
import { of } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MatSnackBarModule,
          useValue: {}
        },
        provideAnimationsAsync(),
        TodoService
      ]
    })
    .compileComponents();

    todoService = TestBed.inject(TodoService);


    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have as many todos as the todos writable signal', fakeAsync(() => {
    const mockTodos: Todo[] = [
      { id: 'affsdfdgdfg', title: 'Test Todo 1', userId: "hjhjk", done: false },
      { id: 'sfsdfhdsfhk', title: 'Test Todo 2', userId: "hjhjk", done: true }
    ];

    const getTodosSpy = spyOn(todoService, 'getTodos').and.returnValue(of({ todos: mockTodos, meta: { total: 0, pageSize: 10 } }));

    component.getTodos();
    fixture.detectChanges();
    expect(component.todos().length).toBe(mockTodos.length);
  }));

  /*
  TODO: When deleteTodo is called with a specific todo, and that todo is returned from the todo service, 
  the todo should be removed from the todos writable signal.
  */
});