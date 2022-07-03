import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/catalog/interfaces/product';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() product!: Product

  constructor() { }

  ngOnInit(): void {
  }

}
