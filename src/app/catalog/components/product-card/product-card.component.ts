import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }


  addToBasket(){
    this.loading = true;
    this.spinner.show(`product-${this.product.id}`)
    
    this.tools.generateNotification('Добавлено в корзину', false)

    this.loading = false;
    this.spinner.hide(`product-${this.product.id}`)
  }

}
