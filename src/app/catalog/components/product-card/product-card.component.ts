import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { environment } from 'src/environments/environment';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product

  apiUrl = environment.apiUrl

  loading: boolean = false;

  constructor(
    private tools: ToolsService,
    private spinner: NgxSpinnerService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }


  addToBasket(){
    this.loading = true;
    this.spinner.show(`product-${this.product.id}`)
    
    this.http.request( Requests['addToBasket'], { qty: 1, productId: this.product.id })
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide(`product-${this.product.id}`)
        })
      )
      .subscribe(
        res => {
          this.tools.generateNotification('Добавлено в корзину', false)
        },
        err => this.tools.generateNotification('Что-то пошло не так', true)
      )

  }

}
