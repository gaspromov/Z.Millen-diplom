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

}
