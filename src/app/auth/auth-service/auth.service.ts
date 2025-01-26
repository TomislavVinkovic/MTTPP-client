import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private http: HttpClient = inject(HttpClient);
  private _loggedInUser: WritableSignal<User|null|undefined> = signal(undefined);
  public user = computed(() => this._loggedInUser());

  constructor() {
    this.validateToken();
  }

  private setAuthenticated(user: User|null|undefined) {
    this._loggedInUser.set(user);
  }
  private validateToken() {
    this.http.post('validate-token', {}).subscribe({
      next: _ => {
        this.setAuthenticated(this.decodeUserFromJwt(localStorage.getItem('token')!));
      },
      error: (err) => {
        this.setAuthenticated(null);
      }
    });
  }
  decodeUserFromJwt(token: string) {
    return jwtDecode(token) as User;
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<{ token: string }>('login', credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.setAuthenticated(this.decodeUserFromJwt(response.token));
      }),
      catchError(err => {
        this.setAuthenticated(null);
        throw err;
      })
    );
  }

  register(credentials: { email: string, password: string }) {
    return this.http.post('register', credentials);
  }

  logout() {
    return this.http.post('logout', {}).pipe(
      tap(_ => {
        localStorage.removeItem('token');
        this.setAuthenticated(null);
      })
    );
  }

}

export type User = {
  id: string;
  email: string;
}