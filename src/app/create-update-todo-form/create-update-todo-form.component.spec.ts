import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTodoFormComponent } from './create-update-todo-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../auth/auth-service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CreateUpdateTodoFormComponent', () => {
  let component: CreateUpdateTodoFormComponent;
  let fixture: ComponentFixture<CreateUpdateTodoFormComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CreateUpdateTodoFormComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        { 
          provide: MatDialogRef, 
          useValue: {} 
        },
        provideAnimationsAsync(),
      ]
    });
    
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(CreateUpdateTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
