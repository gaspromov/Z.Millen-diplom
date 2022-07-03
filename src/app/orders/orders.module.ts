import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { Route, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AccountModule } from '../account/account.module';
import { OrderCustomerComponent } from './components/order-customer/order-customer.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderProductsComponent } from './components/order-products/order-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Route[] = [
  { path: '', component: OrdersComponent },
  { path: '**', redirectTo: '/orders' },
]

@NgModule({
  declarations: [
    OrdersComponent,
    OrderCustomerComponent,
    OrderCardComponent,
    OrderProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
    // AccountModule
  ]
})
export class OrdersModule { }
