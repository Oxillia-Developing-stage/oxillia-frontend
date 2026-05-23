import { Routes } from "@angular/router";
import {HomeRoutes} from "../../features/home/home.routes";
import { profileRoutes } from "../../features/profile/profile.routes";
import { ShopRoutes } from "../../features/shop/shop.routes";
import { ProductRoutes } from "../../features/products/product.routes";

export const mainRoutes: Routes = [
    {
        path: 'main',
        children: [
            {path:'', redirectTo: 'home', pathMatch: 'full'},
            ...HomeRoutes,
            ...profileRoutes,
            ...ShopRoutes,
            ...ProductRoutes
        ]
    }
]