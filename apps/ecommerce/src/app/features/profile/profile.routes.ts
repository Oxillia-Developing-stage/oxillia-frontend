import { Routes } from "@angular/router";

export const profileRoutes:Routes = [
    {
        path: 'profile',
        loadComponent: () => import('./profile').then(m => m.Profile)
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent)
    }
]