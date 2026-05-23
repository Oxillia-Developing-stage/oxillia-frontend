import { Routes } from "@angular/router";

export const ShopRoutes:Routes = [
    {
        path: 'shop',
        loadComponent: () => import('./shop').then(m => m.Shop)
    }
]