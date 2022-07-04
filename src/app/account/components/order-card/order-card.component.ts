import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order
  statuses = [ 'Новый', 'В обработке', 'Подтвержден', 'Завершен' ]
  constructor() { }

  ngOnInit(): void {
  }


  getNum( str: String ){
    return Number(str)
  }

}
