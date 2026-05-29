import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';

export const CartRoutes: Routes = [
  {
    path: 'cart',
    loadComponent: () => import('./cart').then((m) => m.Cart),
    canActivate: [authGuard],
  },
];