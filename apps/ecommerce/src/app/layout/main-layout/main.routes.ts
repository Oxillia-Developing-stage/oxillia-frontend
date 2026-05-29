import { Routes } from "@angular/router";
import {HomeRoutes} from "../../features/home/home.routes";
import { profileRoutes } from "../../features/profile/profile.routes";
import { ShopRoutes } from "../../features/shop/shop.routes";
import { ProductRoutes } from "../../features/products/product.routes";
import { CartRoutes } from "../../features/cart/cart.routes";
import { OrderRoutes } from "../../features/order/order.routes";
import { PaymentRoutes } from "../../features/payment/payment.routes";

export const mainRoutes: Routes = [
    {
        path: 'main',
        children: [
            {path:'', redirectTo: 'home', pathMatch: 'full'},
            ...HomeRoutes,
            ...profileRoutes,
            ...ShopRoutes,
            ...ProductRoutes,
            ...CartRoutes,
            ...OrderRoutes,
            ...PaymentRoutes
        ]
    }
]