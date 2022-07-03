import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map, Subscription, take } from 'rxjs';
import { Requests } from '../requests';
import { HttpService } from '../shared/services/http.service';
import { PaginatorComponent } from '../tools/components/paginator/paginator.component';
import { Category } from './interfaces/category';
import { Product } from './interfaces/product';
import { SearchPipe } from './pipes/search.pipe';

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

  filteredCount: number = 0

  @ViewChild(PaginatorComponent) pgCmp!: PaginatorComponent

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private searchPipe: SearchPipe
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
        this.cdr.detectChanges();
        this.getFilteredCount();
      })
  }


  getFilteredCount(){
    this.filteredCount = new SearchPipe().transform(this.products, 'category', this.category?.id, true).length
    this.cdr.detectChanges()
    this.setOutputBrands( 1 )
  }

  
  setOutputBrands( page: number ){
    this.currentPageNum = page;
    this.outputProducts = new SearchPipe().transform(this.products, 'category', this.category?.id, true).slice( (page-1)*this.countOnPage, page * this.countOnPage );
  }

}
