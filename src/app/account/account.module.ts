import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './screens/profile/profile.component';
import { Route, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavComponent } from './components/nav/nav.component';
import { AccountComponent } from './account.component';
import { OrdersComponent } from './screens/orders/orders.component';

const routes: Route[] = [
  { path: '', component: AccountComponent, children: [
    { path: '', component: ProfileComponent, data: {title: 'Профиль', descript: 'Страница профиля в сервисе Rentoo'}  },
    { path: 'orders', component: OrdersComponent, data: {title: 'Заказы', descript: 'Заказы, оформленные в Rentoo'}  },
    { path: '**', redirectTo: '/account' }
  ]},
]

@NgModule({
  declarations: [
    ProfileComponent,
    NavComponent,
    AccountComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule
  ]
})
export class AccountModule { }
