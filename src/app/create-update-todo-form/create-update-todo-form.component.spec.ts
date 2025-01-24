import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTodoFormComponent } from './create-update-todo-form.component';

describe('CreateUpdateTodoFormComponent', () => {
  let component: CreateUpdateTodoFormComponent;
  let fixture: ComponentFixture<CreateUpdateTodoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateTodoFormComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
