import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private TOKEN_KEY = 'user_token';
  private loggedIn = signal(!!localStorage.getItem('token'));
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): void {
    localStorage.getItem(this.TOKEN_KEY);
  }

  login(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loggedIn.set(true);
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.set(false);
  }
}
