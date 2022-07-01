import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Route, RouterModule } from '@angular/router';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { QtyChangerComponent } from './components/qty-changer/qty-changer.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Route[] = [
  { path: '', component: CartComponent },
]

@NgModule({
  declarations: [
    CartComponent,
    CartProductComponent,
    QtyChangerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class CartModule { }
