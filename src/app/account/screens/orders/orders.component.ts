import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  loading: boolean = false;

  orders: Order[] = [
  ]

  activeOrder: Order | undefined;

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }


  getOrders(){
    this.loading = true;
    this.spinner.show();

    this.http.request(Requests['getOrders'])
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide()
        }),
        map((d: Order[]) => d.map(o => {
          return { ...o, products: o.products.map(p => { return { ...p, product: { ...p.product, image: '/media/' + p.product.image } } }) }
        }))
      )
      .subscribe(
        res => this.orders = res,
        err => {},
        () => {
          let orderId = this.activatedRoute.snapshot.queryParams['order']
          orderId = Number(orderId)
          this.activeOrder = this.orders.find(o => o.id == orderId)
        }
      )
  }

}
