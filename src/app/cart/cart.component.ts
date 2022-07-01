import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Requests } from '../requests';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.getCartData();
  }


  getCartData(){
    this.http.request( Requests['getCart'] )
      .pipe(take(1))
      .subscribe(
        res => console.log(res)
      )
  }
}
