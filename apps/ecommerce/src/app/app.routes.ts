import { Routes } from '@angular/router';
import { mainRoutes } from './layout/main-layout/main.routes';
import { authRouters } from './features/auth/auth.routes';

export const routes: Routes = [
    {
        path: '', redirectTo: 'main/home', pathMatch: 'full'
    },
    {
        path: 'oauth/success',
        loadComponent: () => import('./features/auth/pages/oauth-success/oauth-success.component').then(m => m.OauthSuccessComponent)
    },
    ...mainRoutes,
    ...authRouters
];

