import { Component, inject, signal, viewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../models/todo';
import { TodoService } from '../todo-service/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material.module';

@Component({
  selector: 'app-create-update-todo-form',
  templateUrl: './create-update-todo-form.component.html',
  styleUrls: ['./create-update-todo-form.component.scss'],
  imports: [
    FormsModule, 
    CommonModule,
    AppMaterialModule
  ]
})
export class CreateUpdateTodoFormComponent {

  data: {todo?: Todo} = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<CreateUpdateTodoFormComponent>);
  todoService = inject(TodoService);
  
  id = signal(this.data && this.data.todo ? this.data.todo.id : undefined);
  title = signal(this.data && this.data.todo ? this.data.todo.title : '');
  date = signal(this.data && this.data.todo ? this.data.todo.date : '');
  isCompleted = signal(this.data && this.data.todo ? this.data.todo.done : false);

  titleControl = viewChild('title');
  dateControl = viewChild('date');

  onCancel(){
    this.dialogRef.close();
  }
  onSave(){
    const todo = new Todo({
      id: this.id(),
      title: this.title(),
      date: this.date(),
      done: this.isCompleted()
    });
    const action = this.id() ? this.todoService.updateTodo(todo) : this.todoService.createTodo(todo);
    
    action.subscribe({
      next: (data) => {
        this.dialogRef.close(data.todo);
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}
