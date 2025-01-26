import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Todo } from '../models/todo';
import { of } from 'rxjs';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return todos from the server in correct format', (done: DoneFn) => {
    const serverData = {
      todos: [
        { id: '1', userId: 'user1', title: 'Test Todo 1', date: '2023-01-01', done: false },
        { id: '2', userId: 'user2', title: 'Test Todo 2', date: '2023-01-02', done: true }
      ],
      meta: {
        total: 2,
        pages: 1,
        pageSize: 2,
        page: 1
      }
    };

    const expectedData = {
      meta: serverData.meta,
      todos: [
        new Todo({
          id: '1',
          userId: 'user1',
          title: 'Test Todo 1',
          date: '2023-01-01',
          done: false
        }),
        new Todo({
          id: '2',
          userId: 'user2',
          title: 'Test Todo 2',
          date: '2023-01-02',
          done: true
        })
      ]
    };
    const pagination = {
      page: 1,
      perPage: 2
    }

    service.getTodos(pagination).subscribe(result => {
      expect(result).toEqual(expectedData);
      done();
    });
    httpTestingController.expectOne(`todos?perpage=${pagination.perPage}&page=${pagination.page}`)
      .flush(serverData);
  });

  it('should return a Todo object with user id and id upon creation', (done: DoneFn) => {
    const newTodo = {
      title: 'New Todo',
      date: '2023-01-03',
      done: false
    };

    const serverResponse = {
      id: '3',
      userId: 'ffaagg',
      title: 'New Todo',
      date: '2023-01-03',
      done: false
    };

    const expectedTodo = new Todo({
      id: '3',
      userId: 'ffaagg',
      title: 'New Todo',
      date: '2023-01-03',
      done: false
    });


    service.createTodo(newTodo).subscribe(result => {
      expect(result.todo).toEqual(expectedTodo);
      done();
    });
    httpTestingController.expectOne('todos').flush(serverResponse);
  });

  it('should return an updated Todo object upon update', (done: DoneFn) => {
    const updatedTodo = {
      id: 'asdasdasdas',
      title: 'Updated Todo',
      date: '2023-01-04',
      done: true
    };

    const serverResponse = {
      id: 'asdasdasdas',
      userId: 'user1',
      title: 'Updated Todo',
      date: '2023-01-04',
      done: true
    };

    const expectedTodo = new Todo({
      id: 'asdasdasdas',
      userId: 'user1',
      title: 'Updated Todo',
      date: '2023-01-04',
      done: true
    });

    service.updateTodo(updatedTodo).subscribe(result => {
      expect(result.todo).toEqual(expectedTodo);
      done();
    });
    httpTestingController.expectOne(`todos/${updatedTodo.id}`).flush(serverResponse);
  });

  it('should delete a Todo object and return the deleted object', (done: DoneFn) => {
    const todo = new Todo({
      id: 'asdasd111212',
      userId: 'user1',
      title: 'Updated Todo',
      date: '2023-01-04',
      done: true
    });
    const serverResponse = {
      id: 'asdasd111212',
      userId: 'user1',
      title: 'Updated Todo',
      date: '2023-01-04',
      done: true
    };

    service.deleteTodo(todo).subscribe(result => {
      expect(result.todo).toEqual(todo);
      done();
    });
    httpTestingController.expectOne(`todos/${todo.id}`).flush(serverResponse);
  });
});
