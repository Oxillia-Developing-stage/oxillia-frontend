import { Routes } from '@angular/router';
import { mainRoutes } from './layout/main-layout/main.routes';
export const routes: Routes = [
    {
        path: '', redirectTo: 'main/home', pathMatch: 'full'
    }
    ,
    ...mainRoutes
];
