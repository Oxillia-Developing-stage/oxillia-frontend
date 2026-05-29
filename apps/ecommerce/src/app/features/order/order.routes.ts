import { Routes } from '@angular/router';

export const OrderRoutes: Routes = [
  {
    path: 'order',
    loadComponent: () => import('./order').then((m) => m.Order),
  },
];