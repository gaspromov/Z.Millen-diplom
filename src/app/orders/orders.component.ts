import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { Order } from '../account/interfaces/order';
import { Requests } from '../requests';
import { HttpService } from '../shared/services/http.service';
import { OrderOperator } from './interfaces/order-operator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: OrderOperator[] = []

  loading: boolean = false;
  activeOrder: OrderOperator | undefined;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }


  getOrders(){
    this.loading = true;
    this.spinner.show();

    this.http.request( Requests['getOperatorOrders'] )
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide();
        })
      )
      .subscribe(
        res => this.orders = res
      )
  }

}
