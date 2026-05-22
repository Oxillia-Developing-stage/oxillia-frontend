import { Routes } from '@angular/router';
import { ProductDetails } from './pages/product-details/product-details';

export const ProductRoutes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('./products').then((m) => m.Products),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/products-list/products-list').then((m) => m.ProductsList),
            },
            {
                path: ':id',
                component: ProductDetails,
            },
        ],
    },
];