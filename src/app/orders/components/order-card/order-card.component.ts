import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { OrderOperator } from '../../interfaces/order-operator';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order!: OrderOperator
  statuses = [ 
    { id: 0, name: 'Новый'}, 
    { id: 1, name: 'В обработке'}, 
    { id: 2, name: 'Подтвержден'}, 
    { id: 3, name: 'Завершен'}, 
  ]

  orderStatus: number = 0

  loading: boolean = false;


  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.orderStatus = Number(this.order.status)
  }


  changeStatus(){
    this.loading = true;
    this.spinner.show();

    this.http.request(Requests['putOrder'], { orderId: this.order.id, status: this.orderStatus })
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide()
        })
      )
      .subscribe(
        res => this.order.status = this.orderStatus,
        err => this.tools.generateNotification(err.message || 'Что-то пошло не так', true)
      )
  }


  getNum(str: string){
    return Number(str)
  }

}
