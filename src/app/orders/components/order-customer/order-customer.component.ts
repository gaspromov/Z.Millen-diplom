import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/account/interfaces/user';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent implements OnInit {
  @Input() user!: User

  constructor() { }

  ngOnInit(): void {
  }

}
