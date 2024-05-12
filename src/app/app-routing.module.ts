import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./shared/services/auth.guard";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AlreadyLoggedInGuard} from "./shared/services/logged-in.guard";

const routes: Routes = [
    {
      path: 'not-found',
      loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
      canActivate: [AlreadyLoggedInGuard]
    },
    {
      path: 'register',
      loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
      canActivate: [AlreadyLoggedInGuard]
    },
    {
      path: 'account',
      loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'main',
      loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
    },
    {
      path: '',
      redirectTo: '/main',
      pathMatch: "full"
    },
    {
      path: '**',
      redirectTo: '/not-found'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
