import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/account/interfaces/order';
import { environment } from 'src/environments/environment';
import { OrderOperator } from '../../interfaces/order-operator';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {
  apiUrl = environment.apiUrl;
  @Input() order!: OrderOperator

  constructor() { }

  ngOnInit(): void {
  }

}
