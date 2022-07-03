import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { Category } from 'src/app/catalog/interfaces/category';
import { Product } from 'src/app/catalog/interfaces/product';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { ItemsStatesService } from '../../services/items-states.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  pForm!: FormGroup

  @Input() product: Product | undefined;

  @Output() onPostProduct = new EventEmitter<Product>();
  @Output() onClose = new EventEmitter();

  loading: boolean = false;

  categories: Category[] = []

  constructor(
    private http: HttpService,
    private tools: ToolsService,
    private states: ItemsStatesService
  ) { }

  ngOnInit(): void {
    this.generateForm();

    this.loading = true;
    this.states.getCategories()
      .pipe(take(1), finalize(() => this.loading = false))
      .subscribe(res => this.categories = res)
  }

  generateForm(){
    this.pForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(''),
      stock: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      shop: new FormControl(1, Validators.required),
      category: new FormControl(1, Validators.required),
      id: new FormControl()
    })

    if ( this.product )
      this.pForm.patchValue(this.product)
  }


  postForm(){
    this.pForm.markAllAsTouched()
    if ( this.pForm.invalid ) return;

    this.loading = true;

    this.http.request( this.product ? Requests['putProduct'] : Requests['postProduct'], this.pForm.value )
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe(
        res => this.onPostProduct.emit(res),
        err => this.tools.generateNotification(err.message || 'Что-то пошло не так', true),
        () => this.onClose.emit()
      )
  }
}
