import { Routes } from "@angular/router";

export const HomeRoutes:Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/landing-page/landing-page').then(m => m.LandingPage)
    }
    ,
    {
        path: 'shop',
        loadComponent: () => import('./pages/shop-page/shop-page').then(m => m.ShopPage)
    }
]