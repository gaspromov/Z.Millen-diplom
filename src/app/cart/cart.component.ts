import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { Requests } from '../requests';
import { HttpService } from '../shared/services/http.service';
import { Cart } from './interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart!: Cart 
  loading: boolean = false;

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.getCartData();
  }


  getCartData(){
    this.loading = true;
    this.spinner.show();

    this.http.request( Requests['getCart'] )
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide();
        })
      )
      .subscribe(
        res => this.cart = res
      )
  }

  onChangeCartProductFinalPrice( data: { prev: string, new: string } ){
    let prevP = Number(data.prev)
    let newP = Number(data.new)
    this.cart.final_price = String(Number(this.cart.final_price) - prevP + newP);
  }

  onDeleteProduct( pId: number ){
    this.cart.products = this.cart.products.filter(p => p.id != pId)
  }
}
