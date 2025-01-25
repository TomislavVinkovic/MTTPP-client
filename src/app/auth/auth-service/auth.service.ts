import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private http: HttpClient = inject(HttpClient);
  private _loggedInUser: WritableSignal<User|null|undefined> = signal(undefined);
  public user = computed(() => this._loggedInUser());

  constructor() {
    this.http.get<{ token: string }>('/is-authenticated').subscribe({
      next: response => {
        this.setAuthenticated(this.decodeUserFromJwt(response.token));
      },
      error: () => {
        this.setAuthenticated(null);
      }
    });
  }

  private setAuthenticated(user: User|null|undefined) {
    this._loggedInUser.set(user);
  }
  private decodeUserFromJwt(token: string) {
    return jwtDecode(token) as User;
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<{ token: string }>('/login', credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.setAuthenticated(this.decodeUserFromJwt(response.token));
      })
    );
  }

  register(credentials: { email: string, password: string }) {
    return this.http.post('/register', credentials);
  }

  logout() {
    return this.http.post('/logout', {});
  }

}

export type User = {
  id: string;
  email: string;
}