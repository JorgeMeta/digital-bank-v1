import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../../../shared/models/user.model';
import { API_ENDPOINTS } from '../../config/api.endpoints';
import { map } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = API_ENDPOINTS.USERS;
  isLoggedIn = signal(!!localStorage.getItem('token'));
  private router = inject(Router);
  user = signal<any | null>(null);
  constructor(private http: HttpClient) {}

  getUser(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.baseUrl);
  }

  createUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.baseUrl, user).pipe(
      map((createdUser) => {
        const fakeToken = btoa(`${createdUser.email}:${new Date().getTime()}`);

        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(createdUser));

        this.isLoggedIn.set(true);
        this.user.set(createdUser);

        console.log('Usuário registrado e logado:', createdUser);
        return createdUser;
      })
    );
  }

  login(email: string | null | undefined, password: string | null | undefined) {
    return this.http.get<any[]>(`${this.baseUrl}`).pipe(
      map((users) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          const fakeToken = btoa(`${user.email}:${new Date().getTime()}`);
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('user', JSON.stringify(user));
          this.isLoggedIn.set(true);
          console.log('user:', user);
          return user;
        } else {
          this.isLoggedIn.set(false);
          throw new Error('Usuário ou senha incorretos.');
        }
      })
    );
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.user.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('clientes');
    this.router.navigate(['/login']);
  }
}
