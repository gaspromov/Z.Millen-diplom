import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { Product } from '../catalog/interfaces/product';
import { Requests } from '../requests';
import { HttpService } from '../shared/services/http.service';
import { ToolsService } from '../shared/services/tools.service';

@Component({
  selector: 'app-items-manager',
  templateUrl: './items-manager.component.html',
  styleUrls: ['./items-manager.component.scss']
})
export class ItemsManagerComponent implements OnInit {
  items: Product[] = []
  loading: boolean = false;

  searchParam:string = ''

  productForm: { show: boolean, product: Product | undefined } = { show: false, product: undefined }

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(){
    this.loading = true;
    this.spinner.show();

    this.http.request(Requests['getProducts'])
      .pipe(
        take(1),
        finalize(() => {
          this.spinner.hide();
          this.loading = false;
        })
      )
      .subscribe(
        res => this.items = res,
        err => this.tools.generateNotification(err.message || 'Что-то пошло не так', true)
      )
  }



  deleteProduct( pId: number ){
    this.loading = true;
    this.spinner.show();

    this.http.request(Requests['deleteProduct'], null, String(pId))
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide()
        })
      )
      .subscribe(
        res => this.tools.generateNotification('Товар удален', false),
        err => this.tools.generateNotification(err?.message || 'Что-то пошло не так', true),
        () => this.items = this.items.filter(p => p.id != pId)
      )
  }


  onNewProductData( p: Product ){
    // if ( this.items.find( p => p.) )
    if ( this.productForm.product ){
      this.items = this.items.map( i => {
        if (i.id != this.productForm.product?.id) return i
        return p
      })
      this.tools.generateNotification('Товар отредактирован', false)
    }
    else{
      this.items.push(p)
      this.tools.generateNotification('Товар добавлен', false)
    }
  }
}
