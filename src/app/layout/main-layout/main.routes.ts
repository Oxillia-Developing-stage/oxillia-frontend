import { Routes } from "@angular/router";
import {HomeRoutes} from "../../features/home/home.routes";

export const mainRoutes: Routes = [
    {
        path: 'main',
        children: [
            ...HomeRoutes
        ]
    }
]