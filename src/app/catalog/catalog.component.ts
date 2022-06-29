import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map, Subscription, take } from 'rxjs';
import { Requests } from '../requests';
import { HttpService } from '../shared/services/http.service';
import { Category } from './interfaces/category';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: Product[] = [
  ];

  outputProducts: Product[] = []
  countOnPage: number = 12;
  currentPageNum: number = 0;

  searchParam: string = '';
  sortParam: string = '';

  category: {title: string, id?: number} = { title: 'Все товары' }

  loading: Boolean = false;
  spinnerName = 'products'

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
  }


  getProducts(){
    this.loading = true;
    this.spinner.show(this.spinnerName)

    this.http.request( Requests['getProducts'] )
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide(this.spinnerName)
        }),
        map(d => d.map( (p: Product) => { return { ...p, price: Number(p.price) } }))
      )
      .subscribe(res => {
        this.products = res;
      })
  }



  
  setOutputBrands( page: number ){
    this.currentPageNum = page;
    this.outputProducts = this.products.slice( (page-1)*this.countOnPage, page * this.countOnPage );
  }

}
