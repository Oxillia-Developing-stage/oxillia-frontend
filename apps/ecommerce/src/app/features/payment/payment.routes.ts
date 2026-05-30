import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';

export const PaymentRoutes: Routes = [
  {
    path: 'payment',
    loadComponent: () => import('./payment').then((m) => m.Payment),
    canActivate: [authGuard],
  },
  {
    path: 'order-review',
    loadComponent: () => import('./order-review-page').then((m) => m.OrderReviewPageComponent),
    canActivate: [authGuard],
  },
];