import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToolsService } from 'src/app/shared/services/tools.service';

@Component({
  selector: 'app-qty-changer',
  templateUrl: './qty-changer.component.html',
  styleUrls: ['./qty-changer.component.scss']
})
export class QtyChangerComponent implements OnInit {
  @Input() qty!: number
  @Input('productId') pId!: number 

  @Output() onChange = new EventEmitter<number>();

  constructor(
    private http: HttpService,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
  }

  onChangeQty(delta: number){
    this.qty+=delta;
    this.changeQty()
  }

  changeQty(){
    this.http.request( Requests['putProductCart'], { qty: this.qty, productId: this.pId } )
      .pipe(take(1))
      .subscribe({
        next: (res) => this.onChange.emit(this.qty),
        error: err => this.tools.generateNotification('Возникла ошибка при изменении количества товара', true)
      })
  }

}
