import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotAuthGuard } from './shared/guards/not-auth.guard';
import { OperatorGuard } from './shared/guards/operator.guard';
import { UserGuard } from './shared/guards/user.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'home', redirectTo: '/' },
  { path: 'main', redirectTo: '/' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [NotAuthGuard] },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canActivate: [OperatorGuard] },
  { path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
  { path: 'items-manager', loadChildren: () => import('./items-manager/items-manager.module').then(m => m.ItemsManagerModule), canActivate: [OperatorGuard] },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule), canActivate: [UserGuard] },
  { path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
