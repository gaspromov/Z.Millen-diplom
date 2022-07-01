import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { environment } from 'src/environments/environment';
import { CartProduct } from '../../interfaces/cart-product';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {
  apiUrl = environment.apiUrl;
  @Input() product!: CartProduct

  @Output() onChangeFinalPrice = new EventEmitter<{prev: string, new: string}>()
  @Output() onDelete = new EventEmitter();

  loading: boolean = false;

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
  }

  getNum( str: string ){
    return Number(str)
  }

  onChangeQty( newQty: number ){
    let prevPrice = this.product.final_price
    this.product.final_price = String(newQty*this.product.product.price)
    this.onChangeFinalPrice.emit({ prev: prevPrice, new: this.product.final_price})
  }


  delete(){
    this.loading = true;
    this.spinner.show();

    this.http.request(Requests['deleteProductCart'], { productId: this.product.product.id })
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide();
        })
      )
      .subscribe({
        next: () => this.onDelete.emit(),
        error: err => this.tools.generateNotification(err.message || 'Что-то пошло не так', true)
      })
  }
}
