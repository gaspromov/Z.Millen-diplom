import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {
  apiUrl = environment.apiUrl;
  @Input() order!: Order

  constructor() { }

  ngOnInit(): void {
  }

}
