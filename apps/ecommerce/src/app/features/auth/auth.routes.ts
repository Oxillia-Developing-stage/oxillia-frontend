import { Route } from "@angular/router";
import { unauthGuard } from "../../core/guards/unauth-guard";

export const authRouters: Route[]=[
    {path:'auth', loadComponent:()=> import('../../layout/auth-layout/auth-layout').then(m => m.AuthLayout),
        children:[
            {path:'', redirectTo: 'login', pathMatch: 'full'},
            {path:'login', loadComponent:()=> import('./pages/login/login').then(m => m.Login), data:{reverse:false}},
            {path:'signup', loadComponent:()=> import('./pages/register/register').then(m => m.Register), data:{reverse:true}},
            {path:'forget-password', loadComponent:()=> import('./pages/forget-password/forget-password').then(m => m.ForgetPassword), data:{img:false}},
            {path:'resetpassword', loadComponent:()=> import('./pages/resetpassword/resetpassword').then(m => m.Resetpassword), data:{img:false}},
            {path:'reset-password', redirectTo: 'resetpassword', pathMatch: 'full'}
        ],
        canActivate: [unauthGuard]
    }
]