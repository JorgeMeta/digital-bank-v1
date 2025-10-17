import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth-guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('../features/users/register/register').then((m) => m.Register),
  },
  {
    path: 'login',
    loadComponent: () => import('../features/users/login/login').then((m) => m.Login),
  },
  {
    path: 'userlist',
    canActivate: [authGuard], // ✅ Protegido!
    loadComponent: () => import('../features/userlist/userlist').then((m) => m.Userlist),
  },
];
