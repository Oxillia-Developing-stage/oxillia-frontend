import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';

export const PaymentRoutes: Routes = [
  {
    path: 'payment',
    loadComponent: () => import('./payment').then((m) => m.Payment),
    canActivate: [authGuard],
  },
];